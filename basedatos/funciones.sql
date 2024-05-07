CREATE EXTENSION  plpython3u;


CREATE OR REPLACE FUNCTION "public"."bancomexicodivisa"("precio" text, "fecha" text)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    -- Intenta insertar el precio y la fecha en la tabla tipo_cambio
    INSERT INTO tipo_cambio (dato, fecha) VALUES (precio, fecha::date);
    
    -- Si la inserción fue exitosa, devuelve un mensaje JSON de éxito
		PERFORM  enviar_correo('sistemas@inmtec.net','Tarea Programada Tipo Divisa','Se registro correctamente el tipo de cambio de acuerdo a banco de mexico a feha '||fecha||' con tipo de cambio de '|| precio );
		PERFORM  enviar_correo('victor-luna@inmtec.net','Tarea Programada Tipo Divisa','Se registro correctamente el tipo de cambio de acuerdo a banco de mexico a feha '||fecha||' con tipo de cambio de '|| precio );
    result := json_build_object('action', 'success', 'message', 'Registro insertado correctamente');
    RETURN result;
EXCEPTION
    -- En caso de error, captura la excepción y devuelve un mensaje JSON de error
    WHEN OTHERS THEN
        result := json_build_object('action', 'error', 'message', SQLERRM);
				PERFORM  enviar_correo('victor-luna@inmtec.net','Tarea Programada Tipo Divisa Banxico ERROR', SQLERRM);
								PERFORM  enviar_correo('sistemas@inmtec.net','Tarea Programada Tipo Divisa Banxico ERROR', SQLERRM);

        RETURN result;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."bancomexicodivisa"("precio" text, "fecha" text) OWNER TO "postgres";

COMMENT ON FUNCTION "public"."bancomexicodivisa"("precio" text, "fecha" text) IS 'funcion para guardar el tipo de cambio de la divisa
';

CREATE OR REPLACE FUNCTION "public"."divisas_dia"("data" jsonb)
  RETURNS "pg_catalog"."json" AS $BODY$
DECLARE
  a RECORD;
  b RECORD;
  c RECORD;
  usuario_data JSONB;
  RESULT JSONB[] = '{}';
  usuario INT;
  sucursal INT;
BEGIN
  -- Obtener los datos del usuario activo
  SELECT
    CASE
      WHEN perfilid = 1 THEN 1
      WHEN encargado = true THEN 2
      ELSE 3
    END,
    sucursalid
  INTO
    usuario,
    sucursal
  FROM usuarios
  WHERE userid = (data->>'idusuario')::INT;

  IF usuario = 1 THEN
    FOR a IN (SELECT * FROM sucursales ORDER BY empresaid, sucursalid) LOOP
      FOR b IN (SELECT * FROM grupodivisa) LOOP
        SELECT compra, venta, fecha INTO c
        FROM (
          SELECT *,
            ROW_NUMBER() OVER (PARTITION BY grupoid, sucursalid ORDER BY fecha DESC) AS rn
          FROM divisas
          WHERE grupoid = b.idgrupo AND sucursalid = a.sucursalid AND fecha::DATE = CURRENT_DATE
        ) ranked
        WHERE rn = 1;

        RESULT := RESULT || JSONB_BUILD_OBJECT('sucursal', a.nombre_sucursal, 'idgrupo', b.idgrupo, 'grupo', b.grupo, 'compra', c.compra::text, 'venta', c.venta::text, 'fecharegistro', c.fecha,'sucursalid',a.sucursalid);
      END LOOP;
    END LOOP;
  ELSIF usuario = 2 THEN
    FOR a IN (SELECT * FROM sucursales WHERE sucursalid IN (SELECT sucursalid FROM encargadosucursal WHERE encargado = (data->>'idusuario')::INT)) LOOP
      FOR b IN (SELECT * FROM grupodivisa) LOOP
        SELECT compra, venta, fecha INTO c
        FROM (
          SELECT *,
            ROW_NUMBER() OVER (PARTITION BY grupoid, sucursalid ORDER BY fecha DESC) AS rn
          FROM divisas
          WHERE grupoid = b.idgrupo AND sucursalid = a.sucursalid AND fecha::DATE = CURRENT_DATE
        ) ranked
        WHERE rn = 1;

        RESULT := RESULT || JSONB_BUILD_OBJECT('sucursal', a.nombre_sucursal, 'idgrupo', b.idgrupo, 'grupo', b.grupo, 'compra', c.compra::text, 'venta', c.venta::text, 'fecharegistro', c.fecha,'sucursalid',a.sucursalid );
      END LOOP;
    END LOOP;
  ELSIF usuario = 3 THEN
    FOR a IN (SELECT * FROM sucursales WHERE sucursalid = sucursal) LOOP
      FOR b IN (SELECT * FROM grupodivisa) LOOP
        SELECT compra, venta, fecha INTO c
        FROM (
          SELECT *,
            ROW_NUMBER() OVER (PARTITION BY grupoid, sucursalid ORDER BY fecha DESC) AS rn
          FROM divisas
          WHERE grupoid = b.idgrupo AND sucursalid = a.sucursalid AND fecha::DATE = CURRENT_DATE
        ) ranked
        WHERE rn = 1;

        RESULT := RESULT || JSONB_BUILD_OBJECT('sucursal', a.nombre_sucursal, 'idgrupo', b.idgrupo, 'grupo', b.grupo, 'compra', c.compra::text, 'venta', c.venta::text, 'fecharegistro', c.fecha,'sucursalid',a.sucursalid);
      END LOOP;
    END LOOP;
  END IF;

  usuario_data := JSONB_BUILD_OBJECT('valores', RESULT);
  RETURN usuario_data;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."divisas_dia"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."divisas_suc_usuario"("data" jsonb)
  RETURNS "pg_catalog"."json" AS $BODY$
DECLARE
  a RECORD;
  b RECORD;
  c RECORD;
  usuario_data JSONB;
  RESULT JSONB[] = '{}';
  usuario INT;
  sucursal INT;
BEGIN
  -- Obtener los datos del usuario activo
  SELECT
    CASE
      WHEN perfilid = 1 THEN 1
      WHEN encargado = true THEN 2
      ELSE 3
    END,
    sucursalid
  INTO
    usuario,
    sucursal
  FROM usuarios
  WHERE userid = (data->>'idusuario')::INT;

  IF usuario = 1 THEN
   
	  SELECT json_agg(row_to_json(resultado)) into usuario_data
FROM (
    SELECT idsaldos, nombre_sucursal, grupo, COALESCE(entrada, salida) as saldo, ms.fecharegistro, descripcion, entrada, salida,idsucursalid,idgrupodivisa
    FROM mov_saldos ms
    JOIN sucursales s ON ms.idsucursalid = s.sucursalid
    JOIN grupodivisa gd ON ms.idgrupodivisa = gd.idgrupo
    WHERE ms.fecharegistro::date = current_date
) resultado;
	 
  ELSIF usuario = 2 THEN
	
		 SELECT json_agg(row_to_json(resultado)) into usuario_data
FROM (
    SELECT idsaldos, nombre_sucursal, grupo, COALESCE(entrada, salida) as saldo, ms.fecharegistro, descripcion, entrada, salida,idsucursalid,idgrupodivisa
    FROM mov_saldos ms
    JOIN sucursales s ON ms.idsucursalid = s.sucursalid
    JOIN grupodivisa gd ON ms.idgrupodivisa = gd.idgrupo
    WHERE ms.fecharegistro::date = current_date
		and s.sucursalid in ((SELECT sucursalid FROM encargadosucursal WHERE encargado = (data->>'idusuario')::INT))
) resultado;

  ELSIF usuario = 3 THEN

		 SELECT json_agg(row_to_json(resultado)) into usuario_data
FROM (
    SELECT idsaldos, nombre_sucursal, grupo, COALESCE(entrada, salida) as saldo, ms.fecharegistro, descripcion, entrada, salida,idsucursalid,idgrupodivisa
    FROM mov_saldos ms
    JOIN sucursales s ON ms.idsucursalid = s.sucursalid
    JOIN grupodivisa gd ON ms.idgrupodivisa = gd.idgrupo
    WHERE ms.fecharegistro::date = current_date
		and ms.idsucursalid = sucursal
) resultado;

  END IF;

  RETURN usuario_data;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."divisas_suc_usuario"("data" jsonb) OWNER TO "postgres";

COMMENT ON FUNCTION "public"."divisas_suc_usuario"("data" jsonb) IS 'Consulta todos los datos los saldos de las divisas por tipo de usuario';

CREATE OR REPLACE FUNCTION "public"."divisas_sucursal"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
	RESULT JSONB;

BEGIN



WITH UltimasDivisas AS (
  SELECT
    d.grupoid,
    d.iddivisa,
    d.compra,
    d.venta,
    d.fecha,
    g.grupo,
		g.tipo
  FROM
    divisas d
  INNER JOIN grupodivisa g ON d.grupoid = g.idgrupo
  WHERE
    d.sucursalid = (data ->> 'sucursal')::int
    AND d.fecha = (
      SELECT MAX(fecha)
      FROM divisas
      WHERE grupoid = d.grupoid
			and fecha::date = current_date
    )
)
SELECT
  json_agg(
    jsonb_build_object(
      'grupoid', grupoid,
      'iddivisa', iddivisa,
      'compra', compra,
      'venta', venta,
      'fecha', fecha,
      'grupo', grupo,
			'tipo', tipo
    )
  ) into RESULT
FROM
  UltimasDivisas;



	RETURN json_build_object('action', 'success', 'data', RESULT);

EXCEPTION
	WHEN OTHERS THEN
		RETURN json_build_object('action', 'error', 'message', SQLERRM);

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."divisas_sucursal"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."divisas_sucursales"("data" jsonb)
  RETURNS "pg_catalog"."json" AS $BODY$
DECLARE
  a RECORD;
  b RECORD;
  c RECORD;
  usuario_data JSONB;
  RESULT JSONB[] = '{}';
  usuario INT;
  sucursal INT;
BEGIN
  -- Obtener los datos del usuario activo
  SELECT
    CASE
      WHEN perfilid = 1 THEN 1
      WHEN encargado = true THEN 2
      ELSE 3
    END,
    sucursalid
  INTO
    usuario,
    sucursal
  FROM usuarios
  WHERE userid = (data->>'idusuario')::INT;

  IF usuario = 1 THEN
   
	 SELECT json_agg(row_to_json(consulta))  into usuario_data
FROM (
    SELECT nombre_sucursal, grupo, (ent - sal) as saldo,g.tipo
    FROM (
        SELECT idsucursalid, idgrupodivisa, sum(entrada) as ent, sum(salida) as sal
        FROM mov_saldos
        WHERE (fecharegistro)::date = current_date
        GROUP BY idgrupodivisa, idsucursalid
    ) t
    JOIN grupodivisa g ON t.idgrupodivisa = g.idgrupo
    JOIN sucursales s ON s.sucursalid = t.idsucursalid
    ORDER BY grupo, nombre_sucursal
) consulta;
	 
  ELSIF usuario = 2 THEN
	 SELECT json_agg(row_to_json(consulta))  into usuario_data
FROM (
    SELECT nombre_sucursal, grupo, (ent - sal) as saldo,g.tipo
    FROM (
        SELECT idsucursalid, idgrupodivisa, sum(entrada) as ent, sum(salida) as sal
        FROM mov_saldos
        WHERE (fecharegistro)::date = current_date
				and idsucursalid in 	(SELECT sucursalid FROM encargadosucursal WHERE encargado = (data->>'idusuario')::INT)
        GROUP BY idgrupodivisa, idsucursalid
    ) t
    JOIN grupodivisa g ON t.idgrupodivisa = g.idgrupo
    JOIN sucursales s ON s.sucursalid = t.idsucursalid
    ORDER BY grupo, nombre_sucursal
) consulta;

  ELSIF usuario = 3 THEN

		SELECT json_agg(row_to_json(consulta))  into usuario_data
FROM (
    SELECT nombre_sucursal, grupo, (ent - sal) as saldo,g.tipo
    FROM (
        SELECT idsucursalid, idgrupodivisa, sum(entrada) as ent, sum(salida) as sal
        FROM mov_saldos
        WHERE (fecharegistro)::date = current_date
				and idsucursalid = sucursal
        GROUP BY idgrupodivisa, idsucursalid
    ) t
    JOIN grupodivisa g ON t.idgrupodivisa = g.idgrupo
    JOIN sucursales s ON s.sucursalid = t.idsucursalid
    ORDER BY grupo, nombre_sucursal
) consulta;

  END IF;

  RETURN usuario_data;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."divisas_sucursales"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."enviar_correo"("destinatario" text, "asunto" text, "mensaje" text, "ruta_adjunto" text)
  RETURNS "pg_catalog"."void" AS $BODY$
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

# Configuración de correo
gmail_user = 'sistemas@inmtec.net'
gmail_password = 'rixqpqyvyqsgtlsr'

# Crear mensaje
msg = MIMEMultipart()
msg['From'] = gmail_user
msg['To'] = destinatario
msg['Subject'] = asunto

# Adjuntar el archivo
if ruta_adjunto:
    attachment = open(ruta_adjunto, "rb")
    part = MIMEBase('application', 'octet-stream')
    part.set_payload((attachment).read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', "attachment; filename= %s" % ruta_adjunto.split("/")[-1])
    msg.attach(part)

msg.attach(MIMEText(mensaje, 'plain'))

# Enviar el correo
try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(gmail_user, gmail_password)
    server.sendmail(gmail_user, destinatario, msg.as_string())
    server.close()
except Exception as e:
    return str(e)
$BODY$
  LANGUAGE plpython3u VOLATILE
  COST 100;

ALTER FUNCTION "public"."enviar_correo"("destinatario" text, "asunto" text, "mensaje" text, "ruta_adjunto" text) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."enviar_correo"("destinatario" text, "asunto" text, "mensaje" text)
  RETURNS "pg_catalog"."void" AS $BODY$
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configuración de correo
gmail_user = 'sistemas@inmtec.net'
gmail_password = 'rixqpqyvyqsgtlsr'

# Crear mensaje
msg = MIMEMultipart()
msg['From'] = gmail_user
msg['To'] = destinatario
msg['Subject'] = asunto

msg.attach(MIMEText(mensaje, 'plain'))

# Enviar el correo
try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(gmail_user, gmail_password)
    server.sendmail(gmail_user, destinatario, msg.as_string())
    server.close()
except Exception as e:
    return str(e)
$BODY$
  LANGUAGE plpython3u VOLATILE
  COST 100;

ALTER FUNCTION "public"."enviar_correo"("destinatario" text, "asunto" text, "mensaje" text) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."login_usuario"("data" jsonb)
  RETURNS "pg_catalog"."json" AS $BODY$ DECLARE
	usuario_record record;
sucursal record;
submenu record;
menu_record record;
usuario_data JSON;
menus_array JSON [];
submenus_array JSON [];
sucursales JSON [];

RESULT JSON [] = '{}';
BEGIN-- Obtener los datos del usuario activo
	SELECT
		u.userid,
		( u.nombre || ' ' || u.paterno || ' ' || u.materno ) AS nombre_usuario,
		u.usuario,
		u.calle,
		u.numero,
		cp.colonia,
		cp.municipio,
		cp.estado,
		r.idrol,
		r.descripcion AS nombre_rol,
		u.encargado,
		u.sucursalid INTO usuario_record 
	FROM
		usuarios u
		JOIN cat_dom cp ON u.idcp = cp.
		ID JOIN rol r ON u.perfilid = r.idrol 
	WHERE
		u.usuario = ( DATA ->> 'usuario' ) :: TEXT 
		AND u.contrasena = ( DATA ->> 'password' ) :: TEXT 
		AND u.activo = TRUE;
-- Si el usuario no existe o no está activo, retornar un mensaje
	IF
		usuario_record IS NULL THEN
			RETURN '{"action":"error","message": "Credenciales inválidas o usuario inactivo."}' :: JSON;
		
	END IF;
-- Obtener los menús activos asociados al rol del usuario
	FOR menu_record IN ( SELECT * FROM menusuperior )
	LOOP
	FOR submenu IN (
		SELECT M.idmenus,
			M.menu,
			M.componente 
		FROM
			accesos_rol ar
			JOIN menus M ON ar.idcomponete = M.idmenus 
		WHERE
			ar.idrol = usuario_record.idrol 
			AND M.activo = TRUE 
			AND M.idsubmenu = menu_record.idmenusuperior 
		)
		LOOP
		submenus_array := submenus_array || json_build_object ( 'submenu', submenu.idmenus, 'nombre', submenu.menu,'componente',submenu.componente );
	
END LOOP;
if submenus_array is null THEN
else
RESULT := RESULT || json_build_object ( 'menu', menu_record.descripcion, 'submenus', submenus_array );
end if;
submenus_array := null;
END LOOP;
SELECT
	e.idempresa,
	e.razonsocial,
	telefono,
	cd.cp,
	cd.colonia,
	cd.municipio,
	cd.estado,
	e.rfc,
	s.sucursalid,
	s.nombre_sucursal,
	cd1.cp AS cpsuc,
	cd1.colonia AS colsuc,
	cd1.municipio AS munsuc,
	cd1.estado AS edosuc,
	(s.calle ||' '||s.numero||', cp :'||cd1.cp||', '||cd1.colonia||', '||cd1.municipio||' '||cd1.estado) AS domicilio	
 INTO sucursal 
FROM
	empresas e
	JOIN sucursales s ON e.idempresa = s.empresaid
	JOIN cat_dom cd ON e.idcp = cd.
	ID JOIN cat_dom cd1 ON s.idcp = cd1.ID 
WHERE
	s.sucursalid = usuario_record.sucursalid;
-- Construir el JSON de respuesta
usuario_data := json_build_object (
	'usuario',
	json_build_object (
		'idusuario',
		usuario_record.userid,
		'nombre_usuario',
		usuario_record.nombre_usuario,
		'domicilio',
		( usuario_record.calle || ' ' || usuario_record.numero || ' ' || usuario_record.colonia ),
		'idrol',
		usuario_record.idrol,
		'nombre_rol',
		usuario_record.nombre_rol,
		'sucursal',
		usuario_record.sucursalid,
		'encargado',
		usuario_record.encargado,
		'usuario',usuario_record.usuario 
	),
	'empresa',
	json_build_object (
		'idempresa',
		sucursal.idempresa,
		'razonsocial',
		sucursal.razonsocial,
		'telefono',
		sucursal.telefono,
		'codigo',
		sucursal.cp,
		'colonia',
		sucursal.colonia,
		'municipio',
		sucursal.municipio,
		'estado',
		sucursal.estado,
		'sucursalid',
		sucursal.sucursalid,
		'nombresucursal',
		sucursal.nombre_sucursal,
		'codigosuc',
		sucursal.cpsuc,
		'coloniasuc',
		sucursal.colsuc,
		'municipiosuc',
		sucursal.munsuc,
		'estadosuc',
		sucursal.edosuc ,
		'domicilio',
		sucursal.domicilio,
		'rfc',
		sucursal.rfc
	),
	'menus',
	result 
);
RETURN usuario_data;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."login_usuario"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_acceso_rol"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT JSONB;
BEGIN
	CASE
			
			WHEN ( DATA ->> 'option' ) :: INT = 1 THEN
			INSERT INTO accesos_rol ( idrol, idcomponete, status )
		VALUES
			( ( DATA ->> 'idrol' ) :: INT2, ( DATA ->> 'idcomponete' ) :: INT2, ( DATA ->> 'status' ) :: BOOL ) RETURNING idacceso INTO RESULT;
		RETURN json_build_object ( 'action', 'success', 'message', 'Acceso asociado a rol registrado correctamente', 'idacceso', RESULT );
		
		WHEN ( DATA ->> 'option' ) :: INT = 2 THEN
		UPDATE accesos_rol 
		SET idrol = ( DATA ->> 'idrol' ) :: INT2,
		idcomponete = ( DATA ->> 'idcomponete' ) :: INT2,
		status = ( DATA ->> 'status' ) :: BOOL 
		WHERE
			idacceso = ( DATA ->> 'idacceso' ) :: INT;
		IF
		FOUND THEN
				RETURN json_build_object ( 'action', 'success', 'message', 'Acceso asociado a rol actualizado correctamente' );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Acceso asociado a rol no encontrado' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 3 THEN
		DELETE 
		FROM
			accesos_rol 
		WHERE
			idacceso = ( DATA ->> 'idacceso' ) :: INT;
		IF
		FOUND THEN
				RETURN json_build_object ( 'action', 'success', 'message', 'Acceso asociado a rol eliminado correctamente' );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Acceso asociado a rol no encontrado' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 4 THEN
		SELECT
			row_to_json ( accesos_rol ) INTO RESULT 
		FROM
			accesos_rol 
		WHERE
			idacceso = ( DATA ->> 'idacceso' ) :: INT;
		IF
		RESULT IS NOT NULL THEN
				RETURN json_build_object ( 'action', 'success', 'data', RESULT );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Acceso asociado a rol no encontrado' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 5 THEN
		SELECT
			json_agg ( row_to_json ( ROW ) ) INTO RESULT 
		FROM
			(
			SELECT A
				.*,
				b.menu,
				C.descripcion 
			FROM
				accesos_rol
				A JOIN menus b ON b.idmenus :: INT = A.idcomponete ::
				INT JOIN rol C ON A.idrol = C.idrol 
			) ROW;
		RETURN json_build_object ( 'action', 'success', 'data', RESULT );
		ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Opción no válida' );
		
	END CASE;
	EXCEPTION 
	WHEN OTHERS THEN
		RETURN json_build_object ( 'action', 'error', 'message', SQLERRM );
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_acceso_rol"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_alertaspeps"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO alertaspeps (nombre, descripcion, lista, fecha, tipo, autorizar)
            VALUES (data->>'nombre', data->>'descripcion', data->>'lista', (data->>'fecha')::timestamp, (data->>'tipo')::int, (data->>'autorizar')::bool)
            RETURNING idalert INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Alerta PEP registrada correctamente', 'idalert', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE alertaspeps
            SET nombre = data->>'nombre',
                descripcion = data->>'descripcion',
                lista = data->>'lista',
                fecha = (data->>'fecha')::timestamp,
                tipo = (data->>'tipo')::int,
                autorizar = (data->>'autorizar')::bool
            WHERE idalert = (data->>'idalert')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Alerta PEP actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Alerta PEP no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM alertaspeps WHERE idalert = (data->>'idalert')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Alerta PEP eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Alerta PEP no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(alertaspeps) INTO result
            FROM alertaspeps
            WHERE idalert = (data->>'idalert')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Alerta PEP no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(alertaspeps)) INTO result
            FROM alertaspeps where fecha::date = current_date;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_alertaspeps"("data" jsonb) OWNER TO "geras";

CREATE OR REPLACE FUNCTION "public"."manage_alertasregistros"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO alertasregistros (usuario, alerta, fecha, accion)
            VALUES (data->>'usuario', data->>'alerta', CURRENT_date, (data->>'accion')::int)
            RETURNING idalert INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Alerta de registro registrada correctamente', 'idalert', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE alertasregistros
            SET 
                accion = (data->>'accion')::int
            WHERE idalert = (data->>'idalert')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Alerta de registro actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Alerta de registro no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM alertasregistros WHERE idalert = (data->>'idalert')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Alerta de registro eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Alerta de registro no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(alertasregistros) INTO result
            FROM alertasregistros
            WHERE idalert = (data->>'idalert')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Alerta de registro no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(alertasregistros)) INTO result
            FROM alertasregistros where fecha::date = current_Date and accion =0;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_alertasregistros"("data" jsonb) OWNER TO "geras";

CREATE OR REPLACE FUNCTION "public"."manage_anonimosmsj"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO anonimosmsj (mensaje, fecha)
            VALUES (data->>'mensaje', CURRENT_DATE)
            RETURNING id INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Mensaje anónimo registrado correctamente', 'id', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE anonimosmsj
            SET mensaje = data->>'mensaje',
                fecha = (data->>'fecha')::date
            WHERE id = (data->>'id')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Mensaje anónimo actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Mensaje anónimo no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM anonimosmsj WHERE id = (data->>'id')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Mensaje anónimo eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Mensaje anónimo no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT json_agg(row_to_json(anonimosmsj)) INTO result
            FROM anonimosmsj where fecha = CURRENT_DATE;
            RETURN json_build_object('action', 'success', 'data', result);
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(anonimosmsj)) INTO result
            FROM anonimosmsj where fecha BETWEEN (data->>'fecha')::date and (data->>'fecha1')::date;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_anonimosmsj"("data" jsonb) OWNER TO "geras";

CREATE OR REPLACE FUNCTION "public"."manage_cat_estados"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_estados (estado, puntuacion)
            VALUES (data->>'estado', (data->>'puntuacion')::int)
            RETURNING idest INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Estado registrado correctamente', 'idest', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_estados
            SET estado = data->>'estado', puntuacion = (data->>'puntuacion')::int
            WHERE idest = (data->>'idest')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Estado actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Estado no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_estados WHERE idest = (data->>'idest')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Estado eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Estado no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_estados) INTO result
            FROM cat_estados
            WHERE idest = (data->>'idest')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Estado no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_estados)) INTO result
            FROM cat_estados;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cat_estados"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_cat_ocupaciones"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_ocupaciones (descripcion, claveof, nivel)
            VALUES (data->>'descripcion', data->>'claveof', (data->>'nivel')::int)
            RETURNING idacividad INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Ocupación registrada correctamente', 'idacividad', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_ocupaciones
            SET descripcion = data->>'descripcion', claveof = data->>'claveof', nivel = (data->>'nivel')::int
            WHERE idacividad = (data->>'idacividad')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Ocupación actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Ocupación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_ocupaciones WHERE idacividad = (data->>'idacividad')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Ocupación eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Ocupación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_ocupaciones) INTO result
            FROM cat_ocupaciones
            WHERE idacividad = (data->>'idacividad')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Ocupación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_ocupaciones)) INTO result
            FROM cat_ocupaciones;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cat_ocupaciones"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_cat_paises"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_paises (nombre, codigo, nlist, nivel, paraisofiscal, bloqueado)
            VALUES (data->>'nombre', data->>'codigo', data->>'nlist', (data->>'nivel')::int, (data->>'paraisofiscal')::bool, (data->>'bloqueado')::bool)
            RETURNING idpais INTO result;
            RETURN json_build_object('action', 'success', 'message', 'País registrado correctamente', 'idpais', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_paises
            SET nombre = data->>'nombre', codigo = data->>'codigo', nlist = data->>'nlist', nivel = (data->>'nivel')::int, paraisofiscal = (data->>'paraisofiscal')::bool, bloqueado = (data->>'bloqueado')::bool
            WHERE idpais = (data->>'idpais')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'País actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'País no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_paises WHERE idpais = (data->>'idpais')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'País eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'País no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_paises) INTO result
            FROM cat_paises
            WHERE idpais = (data->>'idpais')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'País no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_paises)) INTO result
            FROM cat_paises;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cat_paises"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_cat_reg"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_reg (idreg, descripcion)
            VALUES (data->>'idreg', data->>'descripcion')
            RETURNING id INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Registro en cat_reg insertado correctamente', 'id', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_reg
            SET idreg = data->>'idreg', descripcion = data->>'descripcion'
            WHERE id = (data->>'id')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Registro en cat_reg actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Registro en cat_reg no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_reg WHERE id = (data->>'id')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Registro en cat_reg eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Registro en cat_reg no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_reg) INTO result
            FROM cat_reg
            WHERE id = (data->>'id')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Registro en cat_reg no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_reg)) INTO result
            FROM cat_reg;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cat_reg"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_cat_tuser"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_tuser (idtipousuario, descripcion, puntos)
            VALUES ((data->>'idtipousuario')::int, data->>'descripcion', (data->>'puntos')::int)
            RETURNING idtipousuario INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Tipo de usuario registrado correctamente', 'idtipousuario', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_tuser
            SET descripcion = data->>'descripcion', puntos = (data->>'puntos')::int
            WHERE idtipousuario = (data->>'idtipousuario')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Tipo de usuario actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Tipo de usuario no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_tuser WHERE idtipousuario = (data->>'idtipousuario')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Tipo de usuario eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Tipo de usuario no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_tuser) INTO result
            FROM cat_tuser
            WHERE idtipousuario = (data->>'idtipousuario')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Tipo de usuario no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_tuser)) INTO result
            FROM cat_tuser;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cat_tuser"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_cliente"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT JSONB;
	clientesx JSONB[];
    r record;
    x record;
    RESULTS JSONB := '[]'::JSONB;
		dato int;
BEGIN
	CASE
			
			WHEN ( DATA ->> 'option' ) :: INT = 1 THEN
		IF
			( ( DATA ->> 'idcp' ) :: INT = 0 ) THEN
				INSERT INTO cliente (
					tipopersona,
					nombre,
					paterno,
					materno,
					idpnaci,
					estanaci,
					fechanacimiento,
					correo,
					nacionalidad,
					telefono,
					ocupacion,
					nif,
					genero,
					ididentificaion,
					nident,
					idcp,
					calle,
					colonia,
					cp,
					estado,
					municipio,
					n_ext,
					nient,
					pais 
				)
			VALUES
				(
					( DATA ->> 'tipopersona' ) :: INT,
					DATA ->> 'nombre',
					DATA ->> 'paterno',
					DATA ->> 'materno',
					( DATA ->> 'idpnaci' ) :: INT,
					( DATA ->> 'estanaci' ) :: INT,
					( DATA ->> 'fechanacimiento' ) :: DATE,
					DATA ->> 'correo',
					( DATA ->> 'nacionalidad' ) :: INT,
					DATA ->> 'telefono',
					( DATA ->> 'ocupacion' ) :: INT,
					DATA ->> 'nif',
					DATA ->> 'genero',
					( DATA ->> 'ididentificaion' ) :: INT,
					(DATA ->> 'nident')::TEXT,
					( DATA ->> 'idcp' ) :: INT,
					DATA ->> 'calle',
					DATA ->> 'colonia',
					DATA ->> 'cp',
					DATA ->> 'estado',
					DATA ->> 'municipio',
					DATA ->> 'n_ext',
					DATA ->> 'nient',
					DATA ->> 'idpais' 
				) RETURNING idcliente INTO RESULT;
			ELSE INSERT INTO cliente (
				tipopersona,
				nombre,
				paterno,
				materno,
				idpnaci,
				estanaci,
				fechanacimiento,
				correo,
				curp,
				rfc,
				nacionalidad,
				telefono,
				ocupacion,
				genero,
				ididentificaion,
				nident,
				idcp, 
				calle, 
				colonia, 
				n_ext, 
				nient 
			)
			VALUES
				(
					( DATA ->> 'tipopersona' ) :: INT,
					DATA ->> 'nombre',
					DATA ->> 'paterno',
					DATA ->> 'materno',
					( DATA ->> 'idpnaci' ) :: INT,
					( DATA ->> 'estanaci' ) :: INT,
					( DATA ->> 'fechanacimiento' ) :: DATE,
					DATA ->> 'correo',
					DATA ->> 'curp',
					DATA ->> 'rfc',
					( DATA ->> 'nacionalidad' ) :: int,
					DATA ->> 'telefono',
					(DATA ->> 'ocupacion')::INT,
					DATA ->> 'genero',
					( DATA ->> 'ididentificaion' ) :: INT,
					DATA ->> 'nident',
					( DATA ->> 'idcp' ) :: INT,
					DATA ->> 'calle',
					DATA ->> 'colonia',
					DATA ->> 'n_ext',
					DATA ->> 'nient' 
				) 		RETURNING idcliente INTO RESULT;

			END IF;
			
			PERFORM riesgocliente((RESULT ->> 'idcliente')::INT);
			
		RETURN json_build_object ( 'action', 'success', 'message', 'Cliente registrado correctamente', 'idcli', RESULT );
		
		WHEN ( DATA ->> 'option' ) :: INT = 2 THEN
		IF
			( ( DATA ->> 'idcp' ) :: INT = 0 ) THEN
				UPDATE cliente 
				SET nombre = DATA ->> 'nombre',
				paterno = DATA ->> 'paterno',
				materno = DATA ->> 'materno',
				idpnaci = ( DATA ->> 'idpnaci' ) :: INT,
				estanaci = ( DATA ->> 'estanaci' ) :: INT,
				fechanacimiento = ( DATA ->> 'fechanacimiento' ) :: DATE,
				correo = DATA ->> 'correo',
				nacionalidad = ( DATA ->> 'nacionalidad' ) :: INT,
				telefono = DATA ->> 'telefono',
				ocupacion = ( DATA ->> 'ocupacion' ) :: INT,
				nif = DATA ->> 'nif',
				genero = DATA ->> 'genero',
				ididentificaion = ( DATA ->> 'ididentificaion' ) :: INT,
				nident = DATA ->> 'nident',
				idcp = ( DATA ->> 'idcp' ) :: INT,
				calle = DATA ->> 'calle',
				colonia = DATA ->> 'colonia',
				cp = DATA ->> 'cp',
				estado = DATA ->> 'estado',
				municipio = DATA ->> 'municipio',
				n_ext = DATA ->> 'n_ext',
				nient = DATA ->> 'nient',
				pais = DATA ->> 'idpais' 
			WHERE
				idcliente = ( DATA ->> 'idcliente' )::int;
			ELSE UPDATE cliente 
			SET nombre = DATA ->> 'nombre',
			paterno = DATA ->> 'paterno',
			materno = DATA ->> 'materno',
			idpnaci = ( DATA ->> 'idpnaci' ) :: INT,
			estanaci = ( DATA ->> 'estanaci' ) :: INT,
			fechanacimiento = ( DATA ->> 'fechanacimiento' ) :: DATE,
			correo = DATA ->> 'correo',
			curp = DATA ->> 'curp',
			rfc = DATA ->> 'rfc',
			nacionalidad = ( DATA ->> 'nacionalidad' ) :: INT,
			telefono = DATA ->> 'telefono',
			ocupacion = ( DATA ->> 'ocupacion' ) :: INT,
			genero = DATA ->> 'genero',
			ididentificaion = ( DATA ->> 'ididentificaion' ) :: INT,
			nident = DATA ->> 'nident',
			idcp = ( DATA ->> 'idcp' ) :: INT,
			calle = DATA ->> 'calle',
			colonia = DATA ->> 'colonia',
			n_ext = DATA ->> 'n_ext',
			nient = DATA ->> 'nient' 
			WHERE
				idcliente = ( DATA ->> 'idcliente' )::int;
			
		END IF;
		IF
		FOUND THEN
				RETURN json_build_object ( 'action', 'success', 'message', 'Cliente actualizado correctamente' );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Cliente no encontrado' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 3 THEN
		DELETE 
		FROM
			cliente 
		WHERE
			idcliente = ( DATA ->> 'idcliente' ) :: INT;
		IF
		FOUND THEN
				RETURN json_build_object ( 'action', 'success', 'message', 'Cliente eliminado correctamente' );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Cliente no encontrado' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 4 THEN
		
		    FOR r IN (SELECT * FROM cliente where tipopersona = 1)
    LOOP
        clientesx = clientesx || ARRAY[jsonb_build_object(
                'idcliente', r.idcliente,
                'tipopersona', r.tipopersona,
                'nombre', r.nombre,
                'paterno', r.paterno,
                'materno', r.materno,
                'idpnaci', r.idpnaci,
                'estanaci', r.estanaci,
                'fechanacimiento', r.fechanacimiento,
                'correo', r.correo,
                'curp', r.curp,
                'rfc', r.rfc,
                'nacionalidad', r.nacionalidad,
                'telefono', r.telefono,
                'ocupacion', r.ocupacion,
                'nif', r.nif,
                'genero', r.genero,
                'ididentificaion', r.ididentificaion,
                'nident', r.nident,
                'idcp', r.idcp,
                'calle', r.calle,
                'colonia', r.colonia,
                'cp', r.cp,
                'estado', r.estado,
                'municipio', r.municipio,
                'n_ext', r.n_ext,
                'nient', r.nient,
                'pais', r.pais,
								'riesgo',r.riesgo
            )];
    END LOOP;

    -- Segunda consulta (cliente_empresa)
    FOR x IN (SELECT * FROM cliente_empresa)
    LOOP
        clientesx = clientesx || ARRAY[jsonb_build_object(
                'nombre', x.razonsocial,
                'paterno', '',
                'materno', '',
                'telefono', x.telefono,
                'correo', '',
                'calle', x.domicilio,
                'tipopersona', '2',
                'idempresa', x.idempresa,
								  'nient',''
            )];
    END LOOP;

    -- Imprimir un mensaje en la consola
    -- Retorna el JSON resultante
    RESULTS := RESULTS || jsonb_build_object('clientes', jsonb_agg(clientesx));

    RETURN jsonb_build_object('action', 'success', 'data', RESULTS);

		WHEN ( DATA ->> 'option' ) :: INT = 5 THEN
		SELECT
			json_agg ( row_to_json ( cliente ) ) INTO RESULT 
		FROM
			cliente where tipopersona = 2 and idcliente in (
select idc from rel_emp_cli where ide = (data ->> 'idempresa')::int
);
		RETURN json_build_object ( 'action', 'success', 'data', RESULT );
		ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Opción no válida' );
		
	END CASE;
	EXCEPTION 
	WHEN OTHERS THEN
		RETURN json_build_object ( 'action', 'error', 'message', SQLERRM, 'qeu envio', DATA );
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cliente"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_cliente_empresa"("data" jsonb)
  RETURNS "pg_catalog"."json" AS $BODY$
DECLARE
  idemp int;
	RESULT int;
BEGIN
  -- Obtener los datos del usuario activo
	
	if(data->>'option')::int = 1 then 
	
	insert into cliente_empresa (razonsocial,rfc,rfcserie,nacionalidad,domicilio,telefono,correo,fechaconstitucion)VALUES(
	(data->>'razonsocial')::text,
	(data->>'rfc')::text,
	(data->>'rfcserie')::text,
	(data->>'nacionalidad')::int,
	(data->>'telefon')::text,
	(data->>'correo')::text
	(data->>'fechaconstitucion')::date) RETURNING idempresa into idemp;
	
				RETURN json_build_object('action', 'success', 'idempresa', idemp);
	end if;
	
	if(data->>'option')::int = 2 then 
		update cliente_empresa SET
		razonsocial = (data->>'razonsocial')::text,
		rfc =	(data->>'rfc')::text,
		rfcserie = 	(data->>'rfcserie')::text,
		nacionalidad=	(data->>'nacionalidad')::int,
		domicilio = (data->>'domicilio')::text
		where idempresa = (data->>'idempresa')::int;

	
	end if;

	if(data->>'option')::int = 3 then 
			IF
			( ( DATA ->> 'idcp' ) :: INT = 0 ) THEN
				INSERT INTO cliente (
					tipopersona,
					nombre,
					paterno,
					materno,
					idpnaci,
					estanaci,
					fechanacimiento,
					correo,
					nacionalidad,
					telefono,
					ocupacion,
					nif,
					genero,
					ididentificaion,
					nident,
					idcp,
					calle,
					colonia,
					cp,
					estado,
					municipio,
					n_ext,
					nient,
					pais 
				)
			VALUES
				(
					( DATA ->> 'tipopersona' ) :: INT,
					DATA ->> 'nombre',
					DATA ->> 'paterno',
					DATA ->> 'materno',
					( DATA ->> 'idpnaci' ) :: INT,
					( DATA ->> 'estanaci' ) :: INT,
					( DATA ->> 'fechanacimiento' ) :: DATE,
					DATA ->> 'correo',
					( DATA ->> 'nacionalidad' ) :: INT,
					DATA ->> 'telefono',
					( DATA ->> 'ocupacion' ) :: INT,
					DATA ->> 'nif',
					DATA ->> 'genero',
					( DATA ->> 'ididentificaion' ) :: INT,
					(DATA ->> 'nident')::TEXT,
					( DATA ->> 'idcp' ) :: INT,
					DATA ->> 'calle',
					DATA ->> 'colonia',
					DATA ->> 'cp',
					DATA ->> 'estado',
					DATA ->> 'municipio',
					DATA ->> 'n_ext',
					DATA ->> 'nient',
					DATA ->> 'pais' 
				) RETURNING idcliente INTO RESULT;
			ELSE INSERT INTO cliente (
				tipopersona,
				nombre,
				paterno,
				materno,
				idpnaci,
				estanaci,
				fechanacimiento,
				correo,
				curp,
				rfc,
				nacionalidad,
				telefono,
				ocupacion,
				genero,
				ididentificaion,
				nident,
				idcp, 
				calle, 
				colonia, 
				n_ext, 
				nient 
			)
			VALUES
				(
					( DATA ->> 'tipopersona' ) :: INT,
					DATA ->> 'nombre',
					DATA ->> 'paterno',
					DATA ->> 'materno',
					( DATA ->> 'idpnaci' ) :: INT,
					( DATA ->> 'estanaci' ) :: INT,
					( DATA ->> 'fechanacimiento' ) :: DATE,
					DATA ->> 'correo',
					DATA ->> 'curp',
					DATA ->> 'rfc',
					( DATA ->> 'nacionalidad' ) :: int,
					DATA ->> 'telefono',
					(DATA ->> 'ocupacion')::INT,
					DATA ->> 'genero',
					( DATA ->> 'ididentificaion' ) :: INT,
					DATA ->> 'nident',
					( DATA ->> 'idcp' ) :: INT,
					DATA ->> 'calle',
					DATA ->> 'colonia',
					DATA ->> 'n_ext',
					DATA ->> 'nient' 
				) 		RETURNING idcliente INTO RESULT;

			END IF;

			insert into rel_emp_cli(idc,ide) VALUES(
			RESULT,(data->>'idempresa')::int   
			);
			RETURN json_build_object ( 'action', 'success', 'message', 'Cliente registrado correctamente');

	end if;
	EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_cliente_empresa"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_divisa"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO divisas ( grupoid, compra, venta, fecha, sucursalid)
            VALUES ( (data->>'grupoid')::int2, (data->>'compra')::numeric, (data->>'venta')::numeric,CURRENT_TIMESTAMP,(data->> 'sucursal')::int )
            RETURNING iddivisa INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Divisa registrada correctamente', 'iddivisa', result);
        
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_divisa"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_empresa"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT JSONB;
BEGIN
	CASE
			
			WHEN ( DATA ->> 'option' ) :: INT = 1 THEN
			INSERT INTO empresas ( razonsocial, rfc, calle, numero, idcp, idpais, telefono, idregimenfiscal, fechainicioop, emailoc, avisoprivasidad, activo, fechacierre )
		VALUES
			(
				DATA ->> 'razonsocial',
				DATA ->> 'rfc',
				DATA ->> 'calle',
				DATA ->> 'numero',
				( DATA ->> 'idcp' ) :: INT,
				( DATA ->> 'idpais' ) :: INT,
				( DATA ->> 'telefono' ) :: TEXT,
				( DATA ->> 'idregimenfiscal' ) :: INT,
				( DATA ->> 'fechainicioop' ) :: DATE,
				DATA ->> 'emailoc',
				DATA ->> 'avisoprivasidad',
				( DATA ->> 'activo' ) :: BOOL,
				( DATA ->> 'fechacierre' ) :: DATE 
			) RETURNING idempresa INTO RESULT;
		RETURN json_build_object ( 'action', 'success', 'message', 'Empresa registrada correctamente', 'idempresa', RESULT );
		
		WHEN ( DATA ->> 'option' ) :: INT = 2 THEN
		UPDATE empresas 
		SET razonsocial = DATA ->> 'razonsocial',
		rfc = DATA ->> 'rfc',
		calle = DATA ->> 'calle',
		numero = DATA ->> 'numero',
		idcp = ( DATA ->> 'idcp' ) :: INT,
		idpais = ( DATA ->> 'idpais' ) :: INT,
		telefono = ( DATA ->> 'telefono' ) :: TEXT,
		idregimenfiscal = ( DATA ->> 'idregimenfiscal' ) :: INT,
		fechainicioop = ( DATA ->> 'fechainicioop' ) :: DATE,
		emailoc = DATA ->> 'emailoc',
		avisoprivasidad = DATA ->> 'avisoprivasidad',
		activo = ( DATA ->> 'activo' ) :: BOOL 
		WHERE
			idempresa = ( DATA ->> 'idempresa' ) :: INT;
		IF
		FOUND THEN
				RETURN json_build_object ( 'action', 'success', 'message', 'Empresa actualizada correctamente' );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Empresa no encontrada' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 3 THEN
		DELETE 
		FROM
			empresas 
		WHERE
			idempresa = ( DATA ->> 'idempresa' ) :: INT;
		IF
		FOUND THEN
				RETURN json_build_object ( 'action', 'success', 'message', 'Empresa eliminada correctamente' );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Empresa no encontrada' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 4 THEN
		SELECT
			row_to_json ( empresas ) INTO RESULT 
		FROM
			empresas 
		WHERE
			idempresa = ( DATA ->> 'idempresa' ) :: INT;
		IF
		RESULT IS NOT NULL THEN
				RETURN json_build_object ( 'action', 'success', 'data', RESULT );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Empresa no encontrada' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 5 THEN
		SELECT
			json_agg ( row_to_json ( empresas ) ) INTO RESULT 
		FROM
			empresas;
		RETURN json_build_object ( 'action', 'success', 'data', RESULT );
		ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Opción no válida' );
		
	END CASE;
	EXCEPTION 
	WHEN OTHERS THEN
		RETURN json_build_object ( 'action', 'error', 'message', SQLERRM );
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_empresa"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_encargados"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT JSONB;
BEGIN
	CASE
			
			WHEN ( DATA ->> 'option' ) :: INT = 1 THEN
			INSERT INTO encargadosucursal (
				encargado,
				sucursalid
			)
		VALUES
			(
				(DATA ->> 'idusuario')::int,
				(DATA ->> 'sucursalid')::int
			
			); 
			RETURN json_build_object('action', 'success', 'message', 'Se Registro correctamente ');
			
		WHEN ( DATA ->> 'option' ) :: INT = 2 THEN
		DELETE 
		FROM
			encargadosucursal 
		WHERE
			idenc = ( DATA ->> 'idencargado' ) :: INT;
		RESULT := '{"action": "success", "message": "eliminado correctamente"}' :: JSONB;
		
		
		ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Opción no válida' );
		
	END CASE;
	RETURN RESULT;
	EXCEPTION 
	WHEN OTHERS THEN
		RESULT := json_build_object ( 'action', 'error', 'message', SQLERRM );
	RETURN RESULT;
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_encargados"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_frecuencia_mes"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO frecuencia_mes (frecuencia, puntuacion)
            VALUES ((data->>'frecuencia')::int, (data->>'puntuacion')::int)
            RETURNING idfrecuencia INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Frecuencia registrada correctamente', 'idfrecuencia', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE frecuencia_mes
            SET frecuencia = (data->>'frecuencia')::int, puntuacion = (data->>'puntuacion')::int
            WHERE idfrecuencia = (data->>'idfrecuencia')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Frecuencia actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Frecuencia no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM frecuencia_mes WHERE idfrecuencia = (data->>'idfrecuencia')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Frecuencia eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Frecuencia no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(frecuencia_mes) INTO result
            FROM frecuencia_mes
            WHERE idfrecuencia = (data->>'idfrecuencia')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Frecuencia no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(frecuencia_mes)) INTO result
            FROM frecuencia_mes;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_frecuencia_mes"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_grupo_divisa"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO grupodivisa (grupo, riesgo)
            VALUES (data->>'grupo', (data->>'riesgo')::bool)
            RETURNING idgrupo INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Grupo de divisa registrado correctamente', 'idgrupo', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE grupodivisa
            SET grupo = data->>'grupo', riesgo = (data->>'riesgo')::bool
            WHERE idgrupo = (data->>'idgrupo')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Grupo de divisa actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Grupo de divisa no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM grupodivisa WHERE idgrupo = (data->>'idgrupo')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Grupo de divisa eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Grupo de divisa no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(grupodivisa) INTO result
            FROM grupodivisa
            WHERE idgrupo = (data->>'idgrupo')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Grupo de divisa no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(grupodivisa)) INTO result
            FROM grupodivisa;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_grupo_divisa"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_identificacion"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_identificacion (descripcion)
            VALUES (data->>'descripcion')
            RETURNING ididentificacion INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Identificación registrada correctamente', 'ididentificacion', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_identificacion
            SET descripcion = data->>'descripcion'
            WHERE ididentificacion = (data->>'ididentificacion')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Identificación actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Identificación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_identificacion WHERE ididentificacion = (data->>'ididentificacion')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Identificación eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Identificación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_identificacion) INTO result
            FROM cat_identificacion
            WHERE ididentificacion = (data->>'ididentificacion')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Identificación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_identificacion)) INTO result
            FROM cat_identificacion;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_identificacion"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_instrumentos"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO instrumentos (descripcion, puntos)
            VALUES (data->>'descripcion', (data->>'puntos')::int)
            RETURNING idtipo INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Instrumento registrado correctamente', 'idtipo', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE instrumentos
            SET descripcion = data->>'descripcion', puntos = (data->>'puntos')::int
            WHERE idtipo = (data->>'idtipo')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Instrumento actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Instrumento no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM instrumentos WHERE idtipo = (data->>'idtipo')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Instrumento eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Instrumento no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(instrumentos) INTO result
            FROM instrumentos
            WHERE idtipo = (data->>'idtipo')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Instrumento no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(instrumentos)) INTO result
            FROM instrumentos;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_instrumentos"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_menu"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO menus (menu, componente, activo)
            VALUES (data->>'menu', data->>'componente', (data->>'activo')::bool)
            RETURNING idmenus INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Menú registrado correctamente', 'idmenus', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE menus
            SET menu = data->>'menu', componente = data->>'componente', activo = (data->>'activo')::bool
            WHERE idmenus = (data->>'idmenus')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Menú actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Menú no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM menus WHERE idmenus = (data->>'idmenus')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Menú eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Menú no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(menus) INTO result
            FROM menus
            WHERE idmenus = (data->>'idmenus')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Menú no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(menus)) INTO result
            FROM menus;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_menu"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_montos_mes"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO montos_mes (nivel, minmonto, maxmonto, puntuacion)
            VALUES (data->>'nivel', (data->>'minmonto')::numeric, (data->>'maxmonto')::numeric, (data->>'puntuacion')::int)
            RETURNING idnivel INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Nivel registrado correctamente', 'idnivel', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE montos_mes
            SET nivel = data->>'nivel', minmonto = (data->>'minmonto')::numeric, maxmonto = (data->>'maxmonto')::numeric, puntuacion = (data->>'puntuacion')::int
            WHERE idnivel = (data->>'idnivel')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Nivel actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Nivel no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM montos_mes WHERE idnivel = (data->>'idnivel')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Nivel eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Nivel no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(montos_mes) INTO result
            FROM montos_mes
            WHERE idnivel = (data->>'idnivel')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Nivel no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(montos_mes)) INTO result
            FROM montos_mes;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_montos_mes"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_nacionalidad"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_nacionalidad (nacionalidad)
            VALUES (data->>'nacionalidad')
            RETURNING idnaci INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Nacionalidad registrada correctamente', 'idnaci', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_nacionalidad
            SET nacionalidad = data->>'nacionalidad'
            WHERE idnaci = (data->>'idnaci')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Nacionalidad actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Nacionalidad no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_nacionalidad WHERE idnaci = (data->>'idnaci')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Nacionalidad eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Nacionalidad no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_nacionalidad) INTO result
            FROM cat_nacionalidad
            WHERE idnaci = (data->>'idnaci')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Nacionalidad no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_nacionalidad)) INTO result
            FROM cat_nacionalidad;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_nacionalidad"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_ocupacion"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO cat_ocupaciones (descripcion, claveof, nivel)
            VALUES (data->>'descripcion', data->>'claveof', (data->>'nivel')::bool)
            RETURNING idacividad INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Ocupación registrada correctamente', 'idacividad', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE cat_ocupaciones
            SET descripcion = data->>'descripcion', claveof = data->>'claveof', nivel = (data->>'nivel')::bool
            WHERE idacividad = (data->>'idacividad')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Ocupación actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Ocupación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM cat_ocupaciones WHERE idacividad = (data->>'idacividad')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Ocupación eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Ocupación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(cat_ocupaciones) INTO result
            FROM cat_ocupaciones
            WHERE idacividad = (data->>'idacividad')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Ocupación no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(cat_ocupaciones)) INTO result
            FROM cat_ocupaciones;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_ocupacion"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_operaciones"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT JSONB;
BEGIN
		INSERT INTO mov_divisas ( tipo, grupoid, mn, me, sucursalid, usuarioid, clienteid, fecharegistro, tipocambio )
	VALUES
		(
			( DATA ->> 'tipo' ) :: INT,
			( DATA ->> 'grupoid' ) :: INT,
			( DATA ->> 'mn' ) :: NUMERIC,
			( DATA ->> 'me' ) :: NUMERIC,
			( DATA ->> 'sucursalid' ) :: INT,
			( DATA ->> 'usuarioid' ) :: INT,
			( DATA ->> 'clienteid' ) :: INT,
			CURRENT_TIMESTAMP,
			( DATA ->> 'tipocambio' ) :: NUMERIC 
		)
	RETURNING idmovimiento INTO RESULT;
	IF
		( ( DATA ->> 'tipo' ) :: INT = 1 ) THEN
			INSERT INTO mov_saldos ( idsucursalid, idgrupodivisa, entrada, salida, idusuario, tipo, fecharegistro, descripcion )
		VALUES
			(
				( DATA ->> 'sucursalid' ) :: INT,
				( DATA ->> 'grupoid' ) :: INT,
				( DATA ->> 'me' ) :: NUMERIC,
				0.00,
				( DATA ->> 'usuarioid' ) :: INT,
				2,
				CURRENT_TIMESTAMP,
				'Compra de divisa' 
			);
		INSERT INTO mov_saldos ( idsucursalid, idgrupodivisa, entrada, salida, idusuario, tipo, fecharegistro, descripcion )
		VALUES
			(
				( DATA ->> 'sucursalid' ) :: INT,
				1,
				0.00,
				( DATA ->> 'mn' ) :: NUMERIC,
				( DATA ->> 'usuarioid' ) :: INT,
				2,
				CURRENT_TIMESTAMP,
				'Compra de divisa' 
			);
		ELSE 
		INSERT INTO mov_saldos ( idsucursalid, idgrupodivisa, entrada, 
		salida, idusuario, tipo, fecharegistro, descripcion )
		VALUES
			(
				( DATA ->> 'sucursalid' ) :: INT,
				( DATA ->> 'grupoid' ) :: INT,
				0.00,
				( DATA ->> 'me' ) :: NUMERIC,
				( DATA ->> 'usuarioid' ) :: INT,
				3,
				CURRENT_TIMESTAMP,
				'Venta de divisa' 
			);
		INSERT INTO mov_saldos ( idsucursalid, idgrupodivisa, entrada, 
		salida, idusuario, tipo, fecharegistro, descripcion )
		VALUES
			(
				( DATA ->> 'sucursalid' ) :: INT,
				1,
				( DATA ->> 'mn' ) :: NUMERIC,
				0.00,
				( DATA ->> 'usuarioid' ) :: INT,
				3,
				CURRENT_TIMESTAMP,
				'Venta de divisa' 
			);
		
	END IF;
	RETURN json_build_object ( 'action', 'success', 'operacion', RESULT );
	EXCEPTION 
	WHEN OTHERS THEN
		RETURN json_build_object ( 'action', 'error', 'message', SQLERRM );
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_operaciones"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_pais_origen"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO pais_origen ("desc", puntos)
            VALUES (data->>'desc', (data->>'puntos')::int)
            RETURNING id INTO result;
            RETURN json_build_object('action', 'success', 'message', 'País de origen registrado correctamente', 'id', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE pais_origen
            SET "desc" = data->>'desc', puntos = (data->>'puntos')::int
            WHERE id = (data->>'id')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'País de origen actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'País de origen no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM pais_origen WHERE id = (data->>'id')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'País de origen eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'País de origen no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(pais_origen) INTO result
            FROM pais_origen
            WHERE id = (data->>'id')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'País de origen no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(pais_origen)) INTO result
            FROM pais_origen;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_pais_origen"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_producto"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO productos (descripcion, puntos)
            VALUES (data->>'descripcion', (data->>'puntos')::int)
            RETURNING idproducto INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Producto registrado correctamente', 'idproducto', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE productos
            SET descripcion = data->>'descripcion', puntos = (data->>'puntos')::int
            WHERE idproducto = (data->>'idproducto')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Producto actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Producto no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM productos WHERE idproducto = (data->>'idproducto')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Producto eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Producto no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(productos) INTO result
            FROM productos
            WHERE idproducto = (data->>'idproducto')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Producto no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(productos)) INTO result
            FROM productos;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_producto"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_rol"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO rol (descripcion)
            VALUES (data->>'descripcion')
            RETURNING idrol INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Rol registrado correctamente', 'idrol', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE rol
            SET descripcion = data->>'descripcion'
            WHERE idrol = (data->>'idrol')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Rol actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Rol no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM rol WHERE idrol = (data->>'idrol')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Rol eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Rol no encontrado');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(rol) INTO result
            FROM rol
            WHERE idrol = (data->>'idrol')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Rol no encontrado');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(rol)) INTO result
            FROM rol;
            RETURN json_build_object('action', 'success', 'data', result);
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_rol"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_saldo_dvisas"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
		idsuc int;
BEGIN

		raise notice '%', data;
	
	if((data->>'idsucursalid')::int<>0)THEN
		idsuc = (data->>'idsucursalid')::int;
	else 
		idsuc = (select sucursalid from usuarios where userid = (data->>'idusuario')::int);
	end if;


    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO mov_saldos (idsucursalid, idgrupodivisa,entrada,salida,idusuario,tipo,fecharegistro,descripcion)
            VALUES (idsuc,(data->>'idgrupodivisa')::int,(data->>'entrada')::numeric,(data->>'salida')::numeric,(data->>'idusuario')::int,(data->>'tipo')::int,CURRENT_TIMESTAMP,(data->>'descripcion'))
            RETURNING idsaldos INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Registro correctamente', 'id', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE mov_saldos
            SET  entrada = (data->>'entrada')::numeric,salida  = (data->>'salida')::numeric , idusuario = (data->>'idusuario')::int , descripcion = (data->>'descripcion')
            WHERE idsaldos = (data->>'idsaldos')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Registro actualizado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Registro no encontrado');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM mov_saldos WHERE idsaldos = (data->>'idsaldos')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Registro eliminado correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Registro en cat_reg no encontrado');
            END IF;
        
        ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_saldo_dvisas"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_sucursal"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    CASE 
        WHEN (data->>'option')::int = 1 THEN
            INSERT INTO sucursales (nombre_sucursal, calle, numero, idcp, fecharegistro, activa, empresaid)
            VALUES (data->>'nombre_sucursal', data->>'calle', data->>'numero', (data->>'idcp')::int, (data->>'fecharegistro')::date, (data->>'activa')::bool, (data->>'empresaid')::int)
            RETURNING sucursalid INTO result;
            RETURN json_build_object('action', 'success', 'message', 'Sucursal registrada correctamente', 'sucursalid', result);
        WHEN (data->>'option')::int = 2 THEN
            UPDATE sucursales
            SET nombre_sucursal = data->>'nombre_sucursal', calle = data->>'calle', numero = data->>'numero', idcp = (data->>'idcp')::int, fecharegistro = (data->>'fecharegistro')::date, activa = (data->>'activa')::bool, empresaid = (data->>'empresaid')::int2
            WHERE sucursalid = (data->>'sucursalid')::int;
            
            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Sucursal actualizada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Sucursal no encontrada');
            END IF;
        WHEN (data->>'option')::int = 3 THEN
            DELETE FROM sucursales WHERE sucursalid = (data->>'sucursalid')::int;

            IF FOUND THEN
                RETURN json_build_object('action', 'success', 'message', 'Sucursal eliminada correctamente');
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Sucursal no encontrada');
            END IF;
        WHEN (data->>'option')::int = 4 THEN
            SELECT row_to_json(sucursales) INTO result
            FROM sucursales
            WHERE sucursalid = (data->>'sucursalid')::int;

            IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'Sucursal no encontrada');
            END IF;
        WHEN (data->>'option')::int = 5 THEN
            SELECT json_agg(row_to_json(sucursales)) INTO result
            FROM sucursales;
            RETURN json_build_object('action', 'success', 'data', result);
         WHEN (data->>'option')::int = 6 THEN
            SELECT json_agg(row_to_json(sucursales)) INTO result
            FROM sucursales
            WHERE empresaid = (data->>'empresaid')::int;
						IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'La Empresa no tiene sucursales');
            END IF;   
				WHEN (data->>'option')::int = 7 THEN
				    IF EXISTS (
        SELECT 1 
        FROM encargadosucursal 
        WHERE encargado = (data->>'userid')::int
    ) THEN 
            SELECT json_agg(row_to_json(sucursales)) INTO result
            FROM sucursales
            WHERE sucursalid in (select sucurusalid from encargadosucursal where encargado = (data->>'userid')::int);
						IF result IS NOT NULL THEN
                RETURN json_build_object('action', 'success', 'data', result);
            ELSE
                RETURN json_build_object('action', 'error', 'message', 'La Empresa no tiene sucursales');
            END IF; 
						ELSE
						SELECT json_agg(row_to_json(sucursales)) INTO result
            FROM sucursales
            WHERE sucursalid in (select sucurusalid from usuarios where sucursalid = (data->>'userid')::int);
						end if;
				ELSE
            RETURN json_build_object('action', 'error', 'message', 'Opción no válida');
    END CASE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_sucursal"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."manage_user"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT JSONB;
BEGIN
	CASE
			
			WHEN ( DATA ->> 'option' ) :: INT = 1 THEN
			INSERT INTO usuarios (
				usuario,
				contrasena,
				nombre,
				paterno,
				materno,
				calle,
				numero,
				idcp,
				correo,
				telefono,
				activo,
				fecharegistro,
				usuariomodifico,
				fechamodificacion,
				perfilid,
				sucursalid,
				encargado 
			)
		VALUES
			(
				DATA ->> 'usuario',
				DATA ->> 'contrasena',
				DATA ->> 'nombre',
				DATA ->> 'paterno',
				DATA ->> 'materno',
				DATA ->> 'calle',
				DATA ->> 'numero',
				( DATA ->> 'idcp' ) :: INT,
				DATA ->> 'correo',
				DATA ->> 'telefono',
				( DATA ->> 'activo' ) :: BOOL,
				( DATA ->> 'fecharegistro' ) :: DATE,
				DATA ->> 'usuariomodifico',
				( DATA ->> 'fechamodificacion' ) :: DATE,
				( DATA ->> 'perfilid' ) :: INT,
				( DATA ->> 'sucursalid' ) :: INT ,
				(DATA ->> 'encargado')::bool
			); 
			RETURN json_build_object('action', 'success', 'message', 'Se Registro correctamente ');
			
			
		
		WHEN ( DATA ->> 'option' ) :: INT = 2 THEN
		UPDATE usuarios 
		SET usuario = DATA ->> 'usuario',
		contrasena = DATA ->> 'contrasena',
		nombre = DATA ->> 'nombre',
		paterno = DATA ->> 'paterno',
		materno = DATA ->> 'materno',
		calle = DATA ->> 'calle',
		numero = DATA ->> 'numero',
		idcp = ( DATA ->> 'idcp' ) :: INT,
		correo = DATA ->> 'correo',
		telefono = DATA ->> 'telefono',
		activo = ( DATA ->> 'activo' ) :: BOOL,
		fecharegistro = ( DATA ->> 'fecharegistro' ) :: DATE,
		usuariomodifico = DATA ->> 'usuariomodifico',
		fechamodificacion = ( DATA ->> 'fechamodificacion' ) :: DATE,
		perfilid = ( DATA ->> 'perfilid' ) :: INT,
		sucursalid = ( DATA ->> 'sucursalid' ) :: INT,
		encargado = (DATA ->> 'encargado')::bool
		WHERE
			userid = ( DATA ->> 'userid' ) :: INT;
		RESULT := '{"action": "success", "message": "Usuario actualizado correctamente"}' :: JSONB;
		
		WHEN ( DATA ->> 'option' ) :: INT = 3 THEN
		DELETE 
		FROM
			usuarios 
		WHERE
			userid = ( DATA ->> 'userid' ) :: INT;
		RESULT := '{"action": "success", "message": "Usuario eliminado correctamente"}' :: JSONB;
		
		WHEN ( DATA ->> 'option' ) :: INT = 4 THEN
		SELECT
			row_to_json ( usuarios ) INTO RESULT 
		FROM
			usuarios 
		WHERE
			userid = ( DATA ->> 'userid' ) :: INT;
		IF
		RESULT IS NOT NULL THEN
				RETURN json_build_object ( 'action', 'success', 'data', RESULT );
			ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Cliente no encontrado' );
			
		END IF;
		
		WHEN ( DATA ->> 'option' ) :: INT = 5 THEN
		SELECT
			json_agg ( row_to_json ( usuarios ) ) INTO RESULT 
		FROM
			usuarios;
		RETURN json_build_object ( 'action', 'success', 'data', RESULT );
		WHEN ( DATA ->> 'option' ) :: INT = 6 THEN
		SELECT
			json_agg ( row_to_json ( usuarios ) ) INTO RESULT 
		FROM
			usuarios where encargado = true;
		RETURN json_build_object ( 'action', 'success', 'data', RESULT );
		ELSE RETURN json_build_object ( 'action', 'error', 'message', 'Opción no válida' );
		
	END CASE;
	RETURN RESULT;
	EXCEPTION 
	WHEN OTHERS THEN
		RESULT := json_build_object ( 'action', 'error', 'message', SQLERRM );
	RETURN RESULT;
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."manage_user"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."obtenerdatosclientes"()
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    clientesx JSONB[];
    r record;
    x record;
    RESULT JSONB := '[]'::JSONB;
BEGIN
    -- Primera consulta (cliente)
    FOR r IN (SELECT * FROM cliente)
    LOOP
        clientesx = clientesx || ARRAY[jsonb_build_object(
                'idcliente', r.idcliente,
                'tipopersona', r.tipopersona,
                'nombre', r.nombre,
                'paterno', r.paterno,
                'materno', r.materno,
                'idpnaci', r.idpnaci,
                'estanaci', r.estanaci,
                'fechanacimiento', r.fechanacimiento,
                'correo', r.correo,
                'curp', r.curp,
                'rfc', r.rfc,
                'nacionalidad', r.nacionalidad,
                'telefono', r.telefono,
                'ocupacion', r.ocupacion,
                'nif', r.nif,
                'genero', r.genero,
                'ididentificaion', r.ididentificaion,
                'nident', r.nident,
                'idcp', r.idcp,
                'calle', r.calle,
                'colonia', r.colonia,
                'cp', r.cp,
                'estado', r.estado,
                'municipio', r.municipio,
                'n_ext', r.n_ext,
                'nient', r.nient,
                'pais', r.pais
            )];
    END LOOP;

    -- Segunda consulta (cliente_empresa)
    FOR x IN (SELECT * FROM cliente_empresa)
    LOOP
        clientesx = clientesx || ARRAY[jsonb_build_object(
                'nombre', x.razonsocial,
                'paterno', '',
                'materno', '',
                'telefono', '',
                'correo', '',
                'calle', x.domicilio,
                'tipopersona', 2,
                'idempresa', x.idempresa
            )];
    END LOOP;

    -- Imprimir un mensaje en la consola
    RAISE NOTICE 'Mensaje de prueba';

    -- Retorna el JSON resultante
    RESULT := RESULT || jsonb_build_object('usuarios', jsonb_agg(clientesx));

    RETURN jsonb_build_object('action', 'success', 'data', RESULT);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."obtenerdatosclientes"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."quitar_acentos"("texto" text)
  RETURNS "pg_catalog"."text" AS $BODY$
BEGIN
  RETURN unaccent(texto);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."quitar_acentos"("texto" text) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."riesgocliente"("client" int4)
  RETURNS "pg_catalog"."jsonb" AS $BODY$ DECLARE
	RESULT int;
clientesx JSONB [];
r record;
RESULTS JSONB := '[]' :: JSONB;
puser INT = 0;
ppais INT = 0;
par BOOLEAN;
pari INT = 0;
blo BOOLEAN;
bloqui INT = 0;
pdemas INT = 0;
pestado int = 0;
compra INT = 0;
venta INT = 0;
maximo INT = 0;
puntuar INT = 0;
mov INT = 0;
pnivel int  = 0 ;
producto int = 0;
inst int  =0;
movi int  = 0;
produ int = 0;
BEGIN

	select * from cliente into r where idcliente = client;

	SELECT
		puntos INTO puser 
	FROM
		cat_tuser 
	WHERE
		idtipousuario = r.tipopersona;
	IF
		( r.idcp= 0 ) THEN
		SELECT
			nivel,
			paraisofiscal,
			bloqueado INTO ppais,
			par,
			blo 
		FROM
			cat_paises 
		WHERE
			idpais = r.pais::int;
			
		IF
			par = TRUE THEN
				pari = ( SELECT puntos FROM pais_origen WHERE ID = 1 );
			ELSE pari = 0;
			
		END IF;
		IF
			blo = TRUE THEN
				bloqui = ( SELECT puntos FROM pais_origen WHERE ID = 2 );
			ELSE bloqui = 0;
			
		END IF;
				if pari = 10 or bloqui = 10 then 
		UPDATE "public"."cliente" SET  "riesgo" = 'ALTO' WHERE "idcliente" = client; 
		RETURN json_build_object ( 'action', 'success', 'mensaje', RESULT );
		end if;
		IF
			par = FALSE 
			AND blo = FALSE THEN
				pdemas = 2;
			
		END IF;
		ELSE SELECT
			puntuacion INTO pestado 
		FROM
			cat_estados 
		WHERE
			idest = ( SELECT idestado FROM cat_dom WHERE ID = r.idcp );
		pestado = 2;
		pdemas = 2;
		
	END IF;
	IF
		r.tipopersona = 1 THEN
		SELECT MAX
			( suma_mn ) INTO maximo 
		FROM
			(
			SELECT EXTRACT
				( YEAR FROM fecharegistro ) AS anio,
				EXTRACT ( MONTH FROM fecharegistro ) AS mes,
				SUM ( mn ) AS suma_mn 
			FROM
				PUBLIC.mov_divisas 
			WHERE
				clienteid = client
			GROUP BY
				anio,
				mes 
			ORDER BY
				anio,
				mes 
			) AS T;
		SELECT
			puntuacion INTO puntuar 
		FROM
			montos_mes 
		WHERE
			maximo BETWEEN minmonto 
			AND maxmonto;
		SELECT COUNT
			( * ) INTO mov 
		FROM
			mov_divisas 
		WHERE
			clienteid = client 
			AND EXTRACT ( YEAR FROM fecharegistro ) = EXTRACT ( YEAR FROM CURRENT_DATE - INTERVAL '1 month' ) 
			AND EXTRACT ( MONTH FROM fecharegistro ) = EXTRACT ( MONTH FROM CURRENT_DATE - INTERVAL '1 month' );
			
		IF
			mov >= 11 THEN
			SELECT
				puntuacion INTO movi 
			FROM
				frecuencia_mes 
			WHERE
				frecuencia = 11;
			ELSE SELECT
				puntuacion INTO movi 
			FROM
				frecuencia_mes 
			WHERE
				frecuencia = mov;
			
		END IF;

		ELSE SELECT MAX
			( suma_mn ) INTO maximo 
		FROM
			(
			SELECT EXTRACT
				( YEAR FROM fecharegistro ) AS anio,
				EXTRACT ( MONTH FROM fecharegistro ) AS mes,
				SUM ( mn ) AS suma_mn 
			FROM
				PUBLIC.mov_divisas 
			WHERE
				clienteid IN ( SELECT idc FROM rel_emp_cli WHERE ide IN ( SELECT ide FROM rel_emp_cli WHERE idc = client ) ) 
			GROUP BY
				anio,
				mes 
			ORDER BY
				anio,
				mes 
			) AS T;
		SELECT
			puntuacion INTO puntuar 
		FROM
			montos_mes 
		WHERE
			maximo BETWEEN minmonto 
			AND maxmonto;
		SELECT COUNT
			( * ) INTO mov 
		FROM
			mov_divisas 
		WHERE
			clienteid IN ( SELECT idc FROM rel_emp_cli WHERE ide IN ( SELECT ide FROM rel_emp_cli WHERE idc = client ) ) 
			AND EXTRACT ( YEAR FROM fecharegistro ) = EXTRACT ( YEAR FROM CURRENT_DATE - INTERVAL '1 month' ) 
			AND EXTRACT ( MONTH FROM fecharegistro ) = EXTRACT ( MONTH FROM CURRENT_DATE - INTERVAL '1 month' );

		IF
			mov >= 11 THEN
			SELECT
				puntuacion INTO movi 
			FROM
				frecuencia_mes 
			WHERE
				frecuencia = 11;
			ELSE SELECT
				puntuacion INTO movi 
			FROM
				frecuencia_mes 
			WHERE
				frecuencia = mov;
			
		END IF;


	
	END IF;
	
		select nivel into pnivel from cat_ocupaciones where idacividad = r.ocupacion;
		if pnivel = 10 then 
		UPDATE "public"."cliente" SET  "riesgo" = 'ALTO' WHERE "idcliente" = client; 
		RETURN json_build_object ( 'action', 'success', 'mensaje', RESULT );
		end if;
		select sum(puntos) into produ from productos;
		select puntos into inst from instrumentos where idtipo = 1;

		if puntuar is null then puntuar = 0; end if;
		SELECT ((produ+pnivel + movi + puntuar +pestado+pestado+pdemas+pari+puser+inst+bloqui)/10) into RESULT;



if (RESULT <= 3)then 
		UPDATE "public"."cliente" SET  "riesgo" = 'BAJO' WHERE "idcliente" = client; 
ELSIF(RESULT > 3 AND RESULT <=6) THEN
		UPDATE "public"."cliente" SET  "riesgo" = 'MEDIO' WHERE "idcliente" = client; 
ELSE
		UPDATE "public"."cliente" SET  "riesgo" = 'ALTO' WHERE "idcliente" = client; 

END IF;
			RETURN json_build_object ( 'action', 'error', 'que envio', RESULT );
			
			
	EXCEPTION 
	WHEN OTHERS THEN
		RETURN json_build_object ( 'action', 'error', 'message', SQLERRM, 'que envio', client );
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."riesgocliente"("client" int4) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."saldosdia"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    RESULT JSONB := '[]'::jsonb;
    r record;
BEGIN
for r in 
  select (SUM(entrada) - SUM(salida)) AS saldosfinales,
        idgrupodivisa,
        idsucursalid
    FROM
        mov_saldos
    WHERE
        fecharegistro::date = current_date
				and idgrupodivisa = (data ->> 'tdivisa')::int
				and idsucursalid = (data ->> 'sucursal')::int
    GROUP BY
        idgrupodivisa,
        idsucursalid
	LOOP
	return jsonb_build_object('saldosfinales', r.saldosfinales, 'idgrupodivisa', r.idgrupodivisa, 'idsucursalid', r.idsucursalid);
END LOOP;
			
			
EXCEPTION 
WHEN OTHERS THEN
   
    RETURN json_build_object('action', 'error', 'message', SQLERRM);

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."saldosdia"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."saldosiniciales"()
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    RESULT JSONB := '[]'::jsonb;
    r record;
BEGIN
    FOR r IN SELECT
        (SUM(entrada) - SUM(salida)) AS saldosfinales,
        idgrupodivisa,
        idsucursalid
    FROM
        mov_saldos
    WHERE
        fecharegistro::date = current_date - 1
    GROUP BY
        idgrupodivisa,
        idsucursalid
    LOOP
        RESULT = RESULT || jsonb_build_object('saldosfinales', r.saldosfinales, 'idgrupodivisa', r.idgrupodivisa, 'idsucursalid', r.idsucursalid);

        INSERT INTO mov_saldos (idsucursalid, idgrupodivisa, entrada, salida, idusuario, tipo,descripcion, fecharegistro)
        VALUES (r.idsucursalid, r.idgrupodivisa, r.saldosfinales, 0, 1,1, 'Tarea de saldo iniciales por divisa', CURRENT_TIMESTAMP);
    END LOOP;

    PERFORM enviar_correo('sistemas@inmtec.net', 'Tarea Programada Creacion de saldos iniciales para el dia ' || CURRENT_TIMESTAMP, jsonb_pretty(RESULT));
RETURN json_build_object('action', 'success', 'message', 'Tarea completada');

EXCEPTION 
WHEN OTHERS THEN
    PERFORM enviar_correo('sistemas@inmtec.net', 'Tarea Programada Creacion de saldos iniciales para el dia ' || CURRENT_TIMESTAMP || ' fallo', SQLERRM);
    RETURN json_build_object('action', 'error', 'message', SQLERRM);

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."saldosiniciales"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."search_by_cp"("cp_to_search" text)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    SELECT json_agg(row_to_json(cat_dom)) INTO result
    FROM cat_dom
    WHERE cp LIKE '%' || cp_to_search || '%';

    IF result IS NOT NULL THEN
        RETURN json_build_object('action', 'success', 'data', result);
    ELSE
        RETURN json_build_object('action', 'error', 'message', 'El codigo postal '||cp_to_search||' no encontro registros');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."search_by_cp"("cp_to_search" text) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."search_by_cp_id"("cp_to_search" int4)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    result jsonb;
BEGIN
    SELECT json_agg(row_to_json(cat_dom)) INTO result
    FROM cat_dom
    WHERE id =  cp_to_search;

    IF result IS NOT NULL THEN
        RETURN json_build_object('action', 'success', 'data', result);
    ELSE
        RETURN json_build_object('action', 'error', 'message', 'El codigo postal '||cp_to_search||' no encontro registros');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('action', 'error', 'message', SQLERRM);
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."search_by_cp_id"("cp_to_search" int4) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."valida_formulario"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
	RESULT JSONB;
	tipoc NUMERIC;
	valor NUMERIC;
BEGIN
	SELECT dato::numeric INTO tipoc
	FROM tipo_cambio
	WHERE fecha = (SELECT MAX(fecha) FROM tipo_cambio);

	SELECT (data->>'info')::numeric / tipoc::numeric INTO valor;

RAISE NOTICE 'El valor de la variable "valor" es: %', valor;


	CASE
		WHEN valor >= 1 AND valor <= 999 THEN
			RESULT := json_build_object (
				'info', 1,
				'formulario', json_build_object (
					'nombres', TRUE,
					'paterno', TRUE,
					'materno', TRUE,
					'paisnaci', TRUE,
					'estanaci', TRUE,
					'nacionalidad', TRUE,
					'fechanacimiento', TRUE,
					'identificacion', FALSE,
					'numerodeidentificacion', FALSE,
					'genero', TRUE,
					'ocupacion', FALSE,
					'numerotelefono', TRUE,
					'correoelectronico', FALSE,
					'curp', FALSE,
					'rfc', FALSE,
					'numeroidentificacionfiscal', FALSE,
					'pais', FALSE,
					'cp', TRUE,
					'calle', TRUE,
					'numerointerior', FALSE,
					'numeroexterior', FALSE,
					'idcp', TRUE,
					'colonia', TRUE,
					'municipio', TRUE,
					'estado', TRUE,
					'pais_', TRUE
				)
			);
		WHEN valor >= 1000 AND valor <= 2099 THEN
			RESULT := json_build_object (
				'info', 'consultar',
				'formulario', json_build_object (
					'nombres', TRUE,
					'paterno', TRUE,
					'materno', TRUE,
					'paisnaci', TRUE,
					'estanaci', TRUE,
					'nacionalidad', TRUE,
					'fechanacimiento', TRUE,
					'identificacion', FALSE,
					'numerodeidentificacion', FALSE,
					'genero', TRUE,
					'ocupacion', FALSE,
					'numerotelefono', TRUE,
					'correoelectronico', FALSE,
					'curp', FALSE,
					'rfc', FALSE,
					'numeroidentificacionfiscal', FALSE,
					'pais', FALSE,
					'cp', TRUE,
					'calle', TRUE,
					'numerointerior', FALSE,
					'numeroexterior', FALSE,
					'idcp', TRUE,
					'colonia', TRUE,
					'municipio', TRUE,
					'estado', TRUE,
					'pais_', TRUE
				)
			);
		WHEN valor >= 3000 AND valor <= 4999 THEN
			RESULT := json_build_object (
				'info', 'consultar',
				'formulario', json_build_object (
					'nombres', TRUE,
					'paterno', TRUE,
					'materno', TRUE,
					'paisnaci', TRUE,
					'estanaci', TRUE,
					'nacionalidad', TRUE,
					'fechanacimiento', TRUE,
					'identificacion', FALSE,
					'numerodeidentificacion', FALSE,
					'genero', TRUE,
					'ocupacion', FALSE,
					'numerotelefono', TRUE,
					'correoelectronico', FALSE,
					'curp', FALSE,
					'rfc', FALSE,
					'numeroidentificacionfiscal', FALSE,
					'pais', FALSE,
					'cp', TRUE,
					'calle', TRUE,
					'numerointerior', FALSE,
					'numeroexterior', FALSE,
					'idcp', TRUE,
					'colonia', TRUE,
					'municipio', TRUE,
					'estado', TRUE,
					'pais_', TRUE
				)
			);
		WHEN valor >= 5000 AND valor <= 10000 THEN
			RESULT := json_build_object (
				'info', 'consulta',
				'formulario', json_build_object (
					'nombres', TRUE,
					'paterno', TRUE,
					'materno', TRUE,
					'paisnaci', TRUE,
					'estanaci', TRUE,
					'nacionalidad', TRUE,
					'fechanacimiento', TRUE,
					'identificacion', TRUE,
					'numerodeidentificacion', TRUE,
					'genero', TRUE,
					'ocupacion', TRUE,
					'numerotelefono', TRUE,
					'correoelectronico', TRUE,
					'curp', TRUE,
					'rfc', TRUE,
					'numeroidentificacionfiscal', TRUE,
					'pais', TRUE,
					'cp', TRUE,
					'calle', TRUE,
					'numerointerior', TRUE,
					'numeroexterior', TRUE,
					'idcp', TRUE,
					'colonia', TRUE,
					'municipio', TRUE,
					'estado', TRUE,
					'pais_', TRUE
				)
			);
		when valor > 10000 then
			RESULT := json_build_object (
				'info', 'no','messagge','Supera el límite de los 10,000 dólares de acuerdo al tipo de cambio');
		ELSE
			RESULT := '';
	END CASE;

	RETURN json_build_object('action', 'success', 'data', RESULT);

EXCEPTION
	WHEN OTHERS THEN
		RETURN json_build_object('action', 'error', 'message', SQLERRM);

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."valida_formulario"("data" jsonb) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."valida_saldo_dia"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
	RESULT NUMERIC;
	tipoc NUMERIC;
	valor NUMERIC;
	valor2 NUMERIC;
	empresa int;
BEGIN
--obtener el tipo de cambio al dia anterior
	select dato::numeric into valor from tipo_cambio where fecha = (select max(fecha) from tipo_cambio);
	
	if((data->>'tipo')::int=2)THEN
		select ide into empresa from rel_emp_cli where idc =(data->>'clienteid')::int;
	end if;
	
--primer operacion de el total que se a cambiado al dia
if (data->>'tipo')::int = 1 then
	SELECT COALESCE(ROUND((SUM(mn) / NULLIF(valor, 0)), 2), 0.00) INTO tipoc
FROM mov_divisas
WHERE clienteid = (data->>'clienteid')::int AND fecharegistro::date = CURRENT_DATE;
end if;

if (data->>'tipo')::int = 2 then
SELECT COALESCE(ROUND((SUM(mn) / NULLIF(valor, 0)), 2), 0.00) INTO tipoc
FROM mov_divisas
WHERE clienteid in (SELECT idc from rel_emp_cli where ide =empresa::int) AND fecharegistro::date = CURRENT_DATE;
end if;
 --segunda operacion es el saldo en pesos mexicano que por la compra o venta que esta por la operacion 
	select round((data->>'mn')::numeric,2)/valor INTO valor2;
	--suma de el total de dolar 
	select (tipoc+valor2) into RESULT;
	
	IF(RESULT <= 10000.00) THEN
	
		RETURN json_build_object('action', true, 'data', round(RESULT,4));

	
	ELSE
	
		RETURN json_build_object('action', false, 'data', round(RESULT,4), 'messagge', 'Con este movimiento supera el limite diario no puede realizar mas movimientos');

	
	end if;
	

EXCEPTION
	WHEN OTHERS THEN
		RETURN json_build_object('action', 'false', 'message', SQLERRM);

END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."valida_saldo_dia"("data" jsonb) OWNER TO "postgres";

COMMENT ON FUNCTION "public"."valida_saldo_dia"("data" jsonb) IS 'Obtener el total de compra o venta de divisa en doloares ';

CREATE OR REPLACE FUNCTION "public"."validar_divisas"("data" jsonb)
  RETURNS "pg_catalog"."jsonb" AS $BODY$
DECLARE
    usuario_record record;
    r record;
    x record;
    usuario_data JSON;
    menus_array JSON [];
    submenus_array JSON [];
    sucursales JSON [];
  usuario INT;

    RESULT JSONB := '[]'::jsonb; -- Cambiado '{}' a '[]' y asignado el tipo jsonb

BEGIN

  SELECT
    CASE
      WHEN encargado = true THEN 1
      ELSE 2
    END  INTO
    usuario
  FROM usuarios
  WHERE userid = (data->>'idusuario')::INT;
  IF usuario = 1 THEN

    FOR r IN (
        SELECT e.*, s.nombre_sucursal 
        FROM encargadosucursal e 
        JOIN sucursales s ON e.sucursalid = s.sucursalid 
        WHERE encargado = (data ->> 'usuarioid')::int
    )
    LOOP
		RAISE NOTICE 'Este es un mensaje de aviso. %', r.nombre_sucursal;
        FOR x IN (
            SELECT count(*) as total 
            FROM divisas 
            WHERE fecha = CURRENT_DATE AND sucursalid = r.sucursalid
        )
        LOOP
				    RAISE NOTICE 'Este es un mensaje de aviso. %', x.total;

            IF x.total > 0 THEN
                -- Si x.total es mayor que 0, hacer algo aquí si es necesario
            ELSE
                submenus_array := submenus_array || json_build_object('sucursal', r.nombre_sucursal, 'mensaje', 'Agregue una divisa');
            END IF;
        END LOOP;
    END LOOP;

    IF submenus_array IS NULL THEN
        RETURN RESULT;  -- No se han agregado datos a submenus_array
    ELSE
        RETURN json_build_object('info',submenus_array); -- Concatenar los datos al objeto JSON
    END IF;
		end if;
		  IF usuario = 2 THEN
						RETURN '{"message": "XD"}' :: JSON;

			end if;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

ALTER FUNCTION "public"."validar_divisas"("data" jsonb) OWNER TO "postgres";