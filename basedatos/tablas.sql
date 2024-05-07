
CREATE TABLE "public"."accesos_rol" (
  "idacceso" serial not null,
  "idrol" int2 NOT NULL,
  "idcomponete" int2 NOT NULL,
  "status" bool,
  CONSTRAINT "accesos_rol_pkey" PRIMARY KEY ("idacceso")
)
;

ALTER TABLE "public"."accesos_rol" OWNER TO "postgres";

COMMENT ON TABLE "public"."accesos_rol" IS 'tabla de accesos a menus';
CREATE TABLE "public"."actividad_comercial" (
  "idcomercial" serial not NULL,
  "descripcion" text COLLATE "pg_catalog"."default",
  "puntuacion " int4,
  CONSTRAINT "actividad_comercial_pkey" PRIMARY KEY ("idcomercial")
)
;

ALTER TABLE "public"."actividad_comercial" OWNER TO "postgres";

CREATE TABLE "public"."alertaspeps" (
  "idalert" serial not null,
  "nombre" text COLLATE "pg_catalog"."default",
  "descripcion" text COLLATE "pg_catalog"."default",
  "lista" text COLLATE "pg_catalog"."default",
  "fecha" timestamp(6),
  "tipo" int4,
  "autorizar" bool,
  CONSTRAINT "alertaspeps_pkey" PRIMARY KEY ("idalert")
)
;

ALTER TABLE "public"."alertaspeps" OWNER TO "postgres";

CREATE TABLE "public"."alertasregistros" (
  "idalert" serial not null,
  "usuario" text COLLATE "pg_catalog"."default",
  "alerta" text COLLATE "pg_catalog"."default",
  "fecha" date,
  "accion" int4,
  CONSTRAINT "alertasregistros_pkey" PRIMARY KEY ("idalert")
)
;

ALTER TABLE "public"."alertasregistros" OWNER TO "geras";

CREATE TABLE "public"."anonimosmsj" (
  "id" serial not null,
  "mensaje" text COLLATE "pg_catalog"."default",
  "fecha" date,
  CONSTRAINT "anonimosmsj_pkey" PRIMARY KEY ("id")
)
;

ALTER TABLE "public"."anonimosmsj" OWNER TO "geras";

CREATE TABLE "public"."cat_dom" (
  "id" serial not null,
  "cp" text COLLATE "pg_catalog"."default",
  "colonia" text COLLATE "pg_catalog"."default",
  "municipio" text COLLATE "pg_catalog"."default",
  "estado" text COLLATE "pg_catalog"."default",
  "idestado" int2,
  CONSTRAINT "cat_dom_pkey" PRIMARY KEY ("id")
)
;

ALTER TABLE "public"."cat_dom" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_dom" IS 'catalogo de domicilio con base a codigo postal';

CREATE TABLE "public"."cat_estados" (
  "idest" serial not null,
  "estado" text COLLATE "pg_catalog"."default",
  "puntuacion" int4,
  CONSTRAINT "cat_estados_pkey" PRIMARY KEY ("idest")
)
;

ALTER TABLE "public"."cat_estados" OWNER TO "postgres";

COMMENT ON COLUMN "public"."cat_estados"."puntuacion" IS 'matriz de riesgo puntos';

COMMENT ON TABLE "public"."cat_estados" IS 'catalogos de estados mexico';

CREATE TABLE "public"."cat_estados_paises" (
  "idcatest" serial not null,
  "idcatpais" int2,
  "nombre" text COLLATE "pg_catalog"."default",
  CONSTRAINT "cat_estados_paises_pkey" PRIMARY KEY ("idcatest")
)
;

ALTER TABLE "public"."cat_estados_paises" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_estados_paises" IS 'catalogo de estados de paises del mundo';
CREATE TABLE "public"."cat_identificacion" (
  "ididentificacion" serial not null,
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  CONSTRAINT "cat_identificacion_pkey" PRIMARY KEY ("ididentificacion")
)
;

ALTER TABLE "public"."cat_identificacion" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_identificacion" IS 'catalogo de identificaciones del centro cambiario';



CREATE TABLE "public"."cat_nacionalidad" (
  "idnaci" serial not null,
  "nacionalidad" text COLLATE "pg_catalog"."default",
  "clave" varchar(255) COLLATE "pg_catalog"."default",
  CONSTRAINT "cat_nacionalidad_pkey" PRIMARY KEY ("idnaci")
)
;

ALTER TABLE "public"."cat_nacionalidad" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_nacionalidad" IS 'catalogos de nacionalidades ';

CREATE TABLE "public"."cat_ocupaciones" (
  "idacividad" serial not null,
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "claveof" varchar(255) COLLATE "pg_catalog"."default",
  "nivel" int4,
  CONSTRAINT "cat_ocupaciones_pkey" PRIMARY KEY ("idacividad")
)
;

ALTER TABLE "public"."cat_ocupaciones" OWNER TO "postgres";

COMMENT ON COLUMN "public"."cat_ocupaciones"."idacividad" IS ' ';

COMMENT ON TABLE "public"."cat_ocupaciones" IS 'catalogo de ocupaciones';

CREATE TABLE "public"."cat_pais" (
  "idpais" serial not null,
  "nombre" text COLLATE "pg_catalog"."default",
  "iso2" varchar(2) COLLATE "pg_catalog"."default",
  "iso" varchar(3) COLLATE "pg_catalog"."default",
  "lada" varchar(5) COLLATE "pg_catalog"."default",
  CONSTRAINT "cat_pais_pkey" PRIMARY KEY ("idpais")
)
;

ALTER TABLE "public"."cat_pais" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_pais" IS 'catalogo de paises con claves iso';

CREATE TABLE "public"."cat_paises" (
  "idpais" serial not null,
  "nombre" text COLLATE "pg_catalog"."default",
  "codigo" varchar(3) COLLATE "pg_catalog"."default",
  "nlist" text COLLATE "pg_catalog"."default",
  "nivel" int4,
  "paraisofiscal" bool,
  "bloqueado" bool,
  "iso2" varchar(3) COLLATE "pg_catalog"."default",
  CONSTRAINT "cat_paises_pkey" PRIMARY KEY ("idpais")
)
;

ALTER TABLE "public"."cat_paises" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_paises" IS 'catalogo de paises si claves';

CREATE TABLE "public"."cat_reg" (
  "id"serial not null,
  "idreg" varchar(255) COLLATE "pg_catalog"."default",
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  CONSTRAINT "cat_reg_pkey" PRIMARY KEY ("id")
)
;

ALTER TABLE "public"."cat_reg" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_reg" IS 'catalogo de registros de regimen fiscal';
CREATE TABLE "public"."cat_tuser" (
  "idtipousuario" int2 NOT NULL,
  "descripcion" text COLLATE "pg_catalog"."default",
  "puntos" int2,
  CONSTRAINT "cat_tuser_pkey" PRIMARY KEY ("idtipousuario")
)
;

ALTER TABLE "public"."cat_tuser" OWNER TO "postgres";

COMMENT ON TABLE "public"."cat_tuser" IS 'matriz riesgo usuario
';
CREATE TABLE "public"."cliente" (
  "idcliente" serial not null,
  "tipopersona" int4,
  "nombre" text COLLATE "pg_catalog"."default",
  "paterno" text COLLATE "pg_catalog"."default",
  "materno" text COLLATE "pg_catalog"."default",
  "idpnaci" int4,
  "estanaci" int4,
  "fechanacimiento" date,
  "correo" text COLLATE "pg_catalog"."default",
  "curp" text COLLATE "pg_catalog"."default",
  "rfc" text COLLATE "pg_catalog"."default",
  "nacionalidad" int4,
  "telefono" text COLLATE "pg_catalog"."default",
  "ocupacion" int4,
  "nif" text COLLATE "pg_catalog"."default",
  "genero" varchar(255) COLLATE "pg_catalog"."default",
  "ididentificaion" int4,
  "nident" text COLLATE "pg_catalog"."default",
  "idcp" int4,
  "calle" varchar(255) COLLATE "pg_catalog"."default",
  "colonia" varchar(255) COLLATE "pg_catalog"."default",
  "cp" text COLLATE "pg_catalog"."default",
  "estado" text COLLATE "pg_catalog"."default",
  "municipio" text COLLATE "pg_catalog"."default",
  "n_ext" text COLLATE "pg_catalog"."default",
  "nient" text COLLATE "pg_catalog"."default",
  "pais" text COLLATE "pg_catalog"."default",
  "riesgo" text COLLATE "pg_catalog"."default",
  "sucursalderegistro" int4,
  CONSTRAINT "cliente_pkey" PRIMARY KEY ("idcliente")
)
;

ALTER TABLE "public"."cliente" OWNER TO "postgres";

COMMENT ON COLUMN "public"."cliente"."riesgo" IS 'nivel de riesgo';

COMMENT ON COLUMN "public"."cliente"."sucursalderegistro" IS 'registro de la sucursal donde se dio de alta';

COMMENT ON TABLE "public"."cliente" IS 'tabla de clientes fisicos, extranjeros (tipopersona = 1) y morales  (tipopersona = 2) pero solo los representantes que realizan tipos de cambio';

CREATE TABLE "public"."divisas" (
  "iddivisa" serial not null,
  "grupoid" int2,
  "compra" numeric(10,2),
  "venta" numeric(10,2),
  "fecha" timestamp(0),
  "sucursalid" int4,
  CONSTRAINT "divisas_pkey" PRIMARY KEY ("iddivisa")
)
;

ALTER TABLE "public"."divisas" OWNER TO "postgres";

COMMENT ON COLUMN "public"."divisas"."iddivisa" IS 'id de la divisa';

COMMENT ON COLUMN "public"."divisas"."grupoid" IS 'id del grupo al que pertenese';

COMMENT ON COLUMN "public"."divisas"."compra" IS 'valor de compra de la moneda';

COMMENT ON COLUMN "public"."divisas"."venta" IS 'valor de la venta de la moneda';

COMMENT ON TABLE "public"."divisas" IS 'tabla de divisas por sucursales por dia ';

CREATE TABLE "public"."empresas" (
  "idempresa" serial not null,
  "razonsocial" text COLLATE "pg_catalog"."default",
  "rfc" varchar(13) COLLATE "pg_catalog"."default",
  "calle" text COLLATE "pg_catalog"."default",
  "numero" varchar(10) COLLATE "pg_catalog"."default",
  "idcp" int4,
  "idpais" int4,
  "telefono" text COLLATE "pg_catalog"."default",
  "idregimenfiscal" int4,
  "fechainicioop" date,
  "emailoc" text COLLATE "pg_catalog"."default",
  "avisoprivasidad" text COLLATE "pg_catalog"."default",
  "activo" bool,
  "fechacierre" date,
  CONSTRAINT "empresas_pkey" PRIMARY KEY ("idempresa")
)
;

ALTER TABLE "public"."empresas" OWNER TO "postgres";

COMMENT ON COLUMN "public"."empresas"."idempresa" IS 'id de la empresa';

COMMENT ON COLUMN "public"."empresas"."razonsocial" IS 'Nombre de la empresa ';

COMMENT ON COLUMN "public"."empresas"."rfc" IS 'Numero de Registro Federa del Contribuyente';

COMMENT ON COLUMN "public"."empresas"."calle" IS 'Nombre de la calle del domiciliofisltal';

COMMENT ON COLUMN "public"."empresas"."numero" IS 'Numero del domicilio fiscal';

COMMENT ON COLUMN "public"."empresas"."idcp" IS 'Id del Codigo postal seleccionado';

COMMENT ON COLUMN "public"."empresas"."idpais" IS 'Id del pais de la empresa';

COMMENT ON COLUMN "public"."empresas"."telefono" IS 'Telefono de la empresa';

COMMENT ON COLUMN "public"."empresas"."idregimenfiscal" IS 'Id del regimen fiscal de la empresa';

COMMENT ON COLUMN "public"."empresas"."fechainicioop" IS 'Correo electronico del oficial de cumplimiento de la empresa';

COMMENT ON TABLE "public"."empresas" IS 'tabla de empresas para centro cambiario';


CREATE TABLE "public"."encargadosucursal" (
  "idenc" serial not null,
  "encargado" int4,
  "sucursalid" int4
)
;

ALTER TABLE "public"."encargadosucursal" OWNER TO "postgres";

COMMENT ON TABLE "public"."encargadosucursal" IS 'catalogo de usuarios encargados de sucursales ';


CREATE TABLE "public"."frecuencia_mes" (
  "idfrecuencia" serial not null,
  "frecuencia" int4,
  "puntuacion" int4,
  CONSTRAINT "frecuencia_mes_pkey" PRIMARY KEY ("idfrecuencia")
)
;

ALTER TABLE "public"."frecuencia_mes" OWNER TO "postgres";

COMMENT ON TABLE "public"."frecuencia_mes" IS 'matriz de riesgo';
CREATE TABLE "public"."grupodivisa" (
  "idgrupo" serial not null,
  "grupo" varchar(255) COLLATE "pg_catalog"."default",
  "riesgo" bool,
  "tipo" varchar(255) COLLATE "pg_catalog"."default",
  CONSTRAINT "grupodivisa_pkey" PRIMARY KEY ("idgrupo")
)
;

ALTER TABLE "public"."grupodivisa" OWNER TO "postgres";

COMMENT ON COLUMN "public"."grupodivisa"."idgrupo" IS 'id del grupo divisa';

COMMENT ON COLUMN "public"."grupodivisa"."grupo" IS 'nombre de la moneda';

COMMENT ON COLUMN "public"."grupodivisa"."riesgo" IS 'riesgo de la moneda';

COMMENT ON COLUMN "public"."grupodivisa"."tipo" IS 'denominacion mxn usd etc';

COMMENT ON TABLE "public"."grupodivisa" IS 'catalogo de grupos de divisas (dolares,euros,pesos)';

CREATE TABLE "public"."instrumentos" (
  "idtipo"serial not null,
  "descripcion" text COLLATE "pg_catalog"."default",
  "puntos" int4,
  CONSTRAINT "instrumentos_pkey" PRIMARY KEY ("idtipo")
)
;

ALTER TABLE "public"."instrumentos" OWNER TO "postgres";

COMMENT ON TABLE "public"."instrumentos" IS 'matriz riesgo tipo moneda';

CREATE TABLE "public"."menus" (
  "idmenus" serial not null,
  "menu" text COLLATE "pg_catalog"."default",
  "componente" text COLLATE "pg_catalog"."default",
  "activo" bool,
  "idsubmenu" int2
)
;

ALTER TABLE "public"."menus" OWNER TO "postgres";

COMMENT ON TABLE "public"."menus" IS 'Catalogo de menus';

CREATE TABLE "public"."img_suc" (
  "idimg" serial not null,
  "img" text COLLATE "pg_catalog"."default",
  "sucursalid" int4,
  CONSTRAINT "img_suc_pkey" PRIMARY KEY ("idimg")
)
;

ALTER TABLE "public"."img_suc" OWNER TO "postgres";

CREATE TABLE "public"."menusuperior" (
  "idmenusuperior" serial not null,
  "descripcion" text COLLATE "pg_catalog"."default",
  CONSTRAINT "menusuperior_pkey" PRIMARY KEY ("idmenusuperior")
)
;

ALTER TABLE "public"."menusuperior" OWNER TO "postgres";

COMMENT ON TABLE "public"."menusuperior" IS 'catalogo de menus superior';

CREATE TABLE "public"."montos_mes" (
  "idnivel" serial not null,
  "nivel" text COLLATE "pg_catalog"."default",
  "minmonto" numeric,
  "maxmonto" numeric,
  "puntuacion" int4,
  CONSTRAINT "montos_mes_pkey" PRIMARY KEY ("idnivel")
)
;

ALTER TABLE "public"."montos_mes" OWNER TO "postgres";

COMMENT ON TABLE "public"."montos_mes" IS 'montos por mes matriz de riesgo';

CREATE TABLE "public"."mov_divisas" (
  "idmovimiento" serial not null,
  "tipo" int4 NOT NULL,
  "grupoid" int4,
  "mn" numeric,
  "me" numeric,
  "sucursalid" int4,
  "usuarioid" int4,
  "clienteid" int4,
  "fecharegistro" timestamp(6),
  "tipocambio" numeric,
  "tipopago" int4,
  CONSTRAINT "mov_divisas_pkey" PRIMARY KEY ("idmovimiento")
)
;

ALTER TABLE "public"."mov_divisas" OWNER TO "postgres";

COMMENT ON COLUMN "public"."mov_divisas"."tipo" IS 'tipo se refiere a la compra o venta';

COMMENT ON COLUMN "public"."mov_divisas"."grupoid" IS 'id de la divisa que se cambio';

COMMENT ON COLUMN "public"."mov_divisas"."mn" IS 'moneda nacional';

COMMENT ON COLUMN "public"."mov_divisas"."me" IS 'moneda extranjera';

COMMENT ON COLUMN "public"."mov_divisas"."sucursalid" IS 'id de la sucursal que realizo el movimiento';

COMMENT ON COLUMN "public"."mov_divisas"."usuarioid" IS 'id del usuario que realizo el movimiento';

COMMENT ON COLUMN "public"."mov_divisas"."clienteid" IS 'id del cliente que realiza el movimiento';

COMMENT ON COLUMN "public"."mov_divisas"."fecharegistro" IS 'fecha y hora que se realizo el registro';

COMMENT ON COLUMN "public"."mov_divisas"."tipocambio" IS 'el tipo de cambio ya sea de compra o venta moneda nacional';

COMMENT ON COLUMN "public"."mov_divisas"."tipopago" IS 'tipo de pago efectivo o cheque';

COMMENT ON TABLE "public"."mov_divisas" IS 'Registro de compra y venta de divisas';


CREATE TABLE "public"."mov_saldos" (
  "idsaldos" serial not null,
  "idsucursalid" int4,
  "idgrupodivisa" int4,
  "entrada" numeric,
  "salida" numeric,
  "idusuario" int2,
  "tipo" int4,
  "fecharegistro" timestamp(6),
  "descripcion" text COLLATE "pg_catalog"."default",
  CONSTRAINT "mov_saldos_pkey" PRIMARY KEY ("idsaldos")
)
;

ALTER TABLE "public"."mov_saldos" OWNER TO "postgres";

COMMENT ON COLUMN "public"."mov_saldos"."idsucursalid" IS 'id de la sucursal';

COMMENT ON COLUMN "public"."mov_saldos"."idgrupodivisa" IS 'id de la divisa';

COMMENT ON COLUMN "public"."mov_saldos"."entrada" IS 'cantidad que se va ingresar de esa moneda al centro cambiario para tener un inventario';

COMMENT ON COLUMN "public"."mov_saldos"."salida" IS 'cantidad de dinero que sale';

COMMENT ON COLUMN "public"."mov_saldos"."idusuario" IS 'id del usuario que registro';

COMMENT ON COLUMN "public"."mov_saldos"."tipo" IS 'tipo 1 es ingreso de divisas por seguridad, 2 cantidad commprada de dolares para cierre del cajero, 3 cantidad de salida de venta de divisas 4 salida de divisas';

COMMENT ON COLUMN "public"."mov_saldos"."fecharegistro" IS 'fecha de registro';

COMMENT ON COLUMN "public"."mov_saldos"."descripcion" IS 'razon del tipo entrada o zalida';

COMMENT ON TABLE "public"."mov_saldos" IS 'Boveda resgistros de saldos iniciales, y movimientos de compra y venta';

CREATE TABLE "public"."pais_origen" (
  "id" serial not null,
  "desc" text COLLATE "pg_catalog"."default",
  "puntos" int4,
  CONSTRAINT "pais_origen_pkey" PRIMARY KEY ("id")
)
;

ALTER TABLE "public"."pais_origen" OWNER TO "postgres";

COMMENT ON TABLE "public"."pais_origen" IS 'matriz riesgo paise de origen
';

CREATE TABLE "public"."productos" (
  "idproducto" serial not null,
  "descripcion" text COLLATE "pg_catalog"."default",
  "puntos" int4,
  CONSTRAINT "productos_pkey" PRIMARY KEY ("idproducto")
)
;

ALTER TABLE "public"."productos" OWNER TO "postgres";

COMMENT ON TABLE "public"."productos" IS 'matriz riesgo productos';

CREATE TABLE "public"."rel_emp_cli" (
  "idrce" serial not null,
  "idc" int4,
  "ide" int4,
  "puesto" text COLLATE "pg_catalog"."default"
)
;

ALTER TABLE "public"."rel_emp_cli" OWNER TO "postgres";

COMMENT ON COLUMN "public"."rel_emp_cli"."idrce" IS 'id de la realcion cliente con empresa';

COMMENT ON COLUMN "public"."rel_emp_cli"."idc" IS 'id del cliente';

COMMENT ON COLUMN "public"."rel_emp_cli"."ide" IS 'id de la empresa relacionada';

COMMENT ON COLUMN "public"."rel_emp_cli"."puesto" IS 'el puesto que tiene la persona que se va registrar';

COMMENT ON TABLE "public"."rel_emp_cli" IS 'Relacion de empresas con la tabla de clientes para los que estan como registros de las personas relacionadas';

CREATE TABLE "public"."rol" (
  "idrol" serial not null,
  "descripcion" text COLLATE "pg_catalog"."default",
  CONSTRAINT "rol_pkey" PRIMARY KEY ("idrol")
)
;

ALTER TABLE "public"."rol" OWNER TO "postgres";

COMMENT ON TABLE "public"."rol" IS 'Catalogos de roles de usuarios sistema
';
CREATE TABLE "public"."sucursales" (
  "sucursalid" serial not null,
  "nombre_sucursal" text COLLATE "pg_catalog"."default",
  "calle" text COLLATE "pg_catalog"."default",
  "numero" varchar(10) COLLATE "pg_catalog"."default",
  "idcp" int4,
  "fecharegistro" date,
  "fechacierre" date,
  "activa" bool,
  "empresaid" int4,
  CONSTRAINT "sucursales_pkey" PRIMARY KEY ("sucursalid")
)
;

ALTER TABLE "public"."sucursales" OWNER TO "postgres";

COMMENT ON COLUMN "public"."sucursales"."sucursalid" IS 'id de la sucursal registrada';

COMMENT ON COLUMN "public"."sucursales"."nombre_sucursal" IS 'Nombre de la sucursal ';

COMMENT ON COLUMN "public"."sucursales"."calle" IS 'calle de la sucursal';

COMMENT ON COLUMN "public"."sucursales"."numero" IS 'numero de la calle de la sucursal';

COMMENT ON COLUMN "public"."sucursales"."idcp" IS 'Id del codigo postal con los datos necesarios del domicilio';

COMMENT ON COLUMN "public"."sucursales"."fecharegistro" IS 'fecha de registro de sucursal';

COMMENT ON COLUMN "public"."sucursales"."fechacierre" IS 'fecha de cierre de la sucursal';

COMMENT ON COLUMN "public"."sucursales"."activa" IS 'si esta activa la sucursal';

COMMENT ON COLUMN "public"."sucursales"."empresaid" IS 'id de relacion con la empresa';

COMMENT ON TABLE "public"."sucursales" IS 'Catalogos de sucursales ';

CREATE TABLE "public"."tipo_cambio" (
  "id" serial not null,
  "dato" text COLLATE "pg_catalog"."default",
  "fecha" date,
  CONSTRAINT "tipo_cambio_pkey" PRIMARY KEY ("id")
)
;

ALTER TABLE "public"."tipo_cambio" OWNER TO "postgres";

COMMENT ON TABLE "public"."tipo_cambio" IS 'Catalogo de tipo de cambio deacuerdo por banxico al dia anterior para las validaciones';


CREATE TABLE "public"."usuarios" (
  "userid" serial not null,
  "usuario" text COLLATE "pg_catalog"."default",
  "contrasena" text COLLATE "pg_catalog"."default",
  "nombre" text COLLATE "pg_catalog"."default",
  "paterno" text COLLATE "pg_catalog"."default",
  "materno" text COLLATE "pg_catalog"."default",
  "calle" text COLLATE "pg_catalog"."default",
  "numero" varchar(10) COLLATE "pg_catalog"."default",
  "idcp" int4,
  "correo" text COLLATE "pg_catalog"."default",
  "telefono" varchar(10) COLLATE "pg_catalog"."default",
  "activo" bool,
  "fecharegistro" date,
  "fechacierre" date,
  "usuariomodifico" text COLLATE "pg_catalog"."default",
  "fechamodificacion" date,
  "perfilid" int4,
  "sucursalid" int4,
  "encargado" bool,
  CONSTRAINT "usuarios_pkey" PRIMARY KEY ("userid")
)
;

ALTER TABLE "public"."usuarios" OWNER TO "postgres";

COMMENT ON COLUMN "public"."usuarios"."userid" IS 'id del usuario';

COMMENT ON COLUMN "public"."usuarios"."usuario" IS 'Nombre de usuario asignado por el admin';

COMMENT ON COLUMN "public"."usuarios"."contrasena" IS 'Contraseña del usuario';

COMMENT ON COLUMN "public"."usuarios"."nombre" IS 'nombre de usuario';

COMMENT ON COLUMN "public"."usuarios"."paterno" IS 'Apellido paterno';

COMMENT ON COLUMN "public"."usuarios"."materno" IS 'Apellido Materno';

COMMENT ON COLUMN "public"."usuarios"."calle" IS 'Calle del domicilio';

COMMENT ON COLUMN "public"."usuarios"."numero" IS 'Numero del Domicilio';

COMMENT ON COLUMN "public"."usuarios"."idcp" IS 'id del codigo postal seleccionado';

COMMENT ON COLUMN "public"."usuarios"."correo" IS 'correo electronico del usuario';

COMMENT ON COLUMN "public"."usuarios"."telefono" IS 'telefono celular del cliente';

COMMENT ON COLUMN "public"."usuarios"."activo" IS 'si es true esta actico si es false desactivado el usuario';

COMMENT ON COLUMN "public"."usuarios"."fecharegistro" IS 'fecha en la que se registro el usuario';

COMMENT ON COLUMN "public"."usuarios"."fechacierre" IS 'fecha en la que se dio de baja al usuario';

COMMENT ON COLUMN "public"."usuarios"."usuariomodifico" IS 'Nombre del usuario que modifico el usuario';

COMMENT ON COLUMN "public"."usuarios"."fechamodificacion" IS 'fecha en la que se modifico el usuario';

COMMENT ON COLUMN "public"."usuarios"."perfilid" IS 'id del perfil que tiene en la empresa para los accesos';

COMMENT ON COLUMN "public"."usuarios"."sucursalid" IS 'id de la empresa';

COMMENT ON TABLE "public"."usuarios" IS 'Catalogo de usuarios sistemas ';
