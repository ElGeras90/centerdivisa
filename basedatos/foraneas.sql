
ALTER TABLE "public"."mov_divisas" ADD CONSTRAINT "clienteid" FOREIGN KEY ("clienteid") REFERENCES "public"."cliente" ("idcliente") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."mov_divisas" ADD CONSTRAINT "grupoid" FOREIGN KEY ("grupoid") REFERENCES "public"."grupodivisa" ("idgrupo") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."mov_divisas" ADD CONSTRAINT "sucursal" FOREIGN KEY ("sucursalid") REFERENCES "public"."sucursales" ("sucursalid") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."mov_divisas" ADD CONSTRAINT "usuario" FOREIGN KEY ("usuarioid") REFERENCES "public"."usuarios" ("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."sucursales" ADD CONSTRAINT "empresa" FOREIGN KEY ("empresaid") REFERENCES "public"."empresas" ("idempresa") ON DELETE RESTRICT ON UPDATE CASCADE;
