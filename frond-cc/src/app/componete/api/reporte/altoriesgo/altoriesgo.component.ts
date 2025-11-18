import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';

import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-altoriesgo',
  templateUrl: './altoriesgo.component.html',
  styleUrls: ['./altoriesgo.component.css']
})
export class AltoriesgoComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  agentes: any[] = [];
  agencyService: any[] = [];

  fecha: any;
  fecha2:any;
  agencia:any;
  opcion:any;

  @ViewChild(MatPaginator)
  paginators!: MatPaginator;

  displayedColumns: string[] = ['fecha', 'usuario', 'montoenv', 'montorec','fee'];

  dataSource = new MatTableDataSource<any>([]);
  meses: { nombre: string, numero: number }[] = [
    { nombre: 'Enero', numero: 1 },
    { nombre: 'Febrero', numero: 2 },
    { nombre: 'Marzo', numero: 3 },
    { nombre: 'Abril', numero: 4 },
    { nombre: 'Mayo', numero: 5 },
    { nombre: 'Junio', numero: 6 },
    { nombre: 'Julio', numero: 7 },
    { nombre: 'Agosto', numero: 8 },
    { nombre: 'Septiembre', numero: 9 },
    { nombre: 'Octubre', numero: 10 },
    { nombre: 'Noviembre', numero: 11 },
    { nombre: 'Diciembre', numero: 12 }
  ];
 

  mesSeleccionado!: number;
  mesActual!: number;
  year:any;
  elementRef: any;
  constructor(elementRef: ElementRef,
  private router:Router

    ) {

   }

  ngOnInit(): void {
    this.validapermiso();

   // this.allagencias()
  }

  validarMes(d:any): void {
    const dd = d.target.value;
    if (dd < this.mesSeleccionado) {
      // Realiza alguna acción si el mes seleccionado es menor al actual
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginators; // Configurar el paginador
      this.paginators.pageSize = 5; // Establecer el tamaño de página predeterminado
    });
  }

  validapermiso(){
    const valor = {
      idmenus: 9,
      idrol: localStorage.getItem('idrol')
    }
    /**this.ac.validaacceso(valor).subscribe(
      (data: any) => {
      if(data[0].status === false){
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'No tienes acceso a este menu seras redirigido al inicio',
          allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera de la alerta
          allowEscapeKey: false, // Evitar que se cierre al presionar la tecla "Esc"
        });
      this.router.navigateByUrl('/dashboard');
      }
  
      },
      (error: any) => {
        console.log('Error al obtener las agencias:', error);
      }
    );*/
  }
  
  /**allagencias() {
    this.ag.allagencias().subscribe(
      (data: any) => {
        this.agencyService = data;

      },
      (error: any) => {
        console.log('Error al obtener las agencias:', error);
      }
    );
  }*/

  buscar() {
    let datos = {
      fecha: this.fecha,
      fecha2: this.fecha2,
      agencia: this.agencia
    }
  /**   this.ss.pagos(datos).subscribe(
      (data1: any) => {
        this.agentes = data1;

        // Aseguramos que el currentPage sea válido después de obtener los datos
        if (this.currentPage < 1) {
          this.currentPage = 1;
        } else if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
      },
      (error: any) => {
        console.log('Error al obtener las agencias:', error);
      }
    );*/
  }

  get pagedAgencias(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.agentes.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.agentes.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

generatePDF() {

  const pdf = new jsPDF('p', 'mm', 'a4');
  const DATA: any = this.elementRef.nativeElement.querySelector('#pdfContent'); // Asegúrate de que el ID del elemento sea correcto
  const pdfMargins = {
    top: 30, // Márgenes superiores (medidos en mm)
    bottom: 20, // Márgenes inferiores (medidos en mm)
    left: 20, // Márgenes izquierdos (medidos en mm)
    right: 20, // Márgenes derechos (medidos en mm)
  };

  // Obtener el tamaño total de la página
  const pageSize = {
    width: 210, // Ancho de página A4 en mm
    height: 297, // Altura de página A4 en mm
  };

  // Función para agregar el encabezado en cada página
 /**  const addHeader = () => {
   .setFontSize(12);
    pdf.setTextColor(40);
    pdf.text("Este es el encabezado", pdfMargins.left, 15);
  };*/
  const addHeader = () => {
    const imageSrc = 'remicash.png'; // Reemplaza 'URL_o_ruta_de_la_imagen' por la URL o ruta local de la imagen
    const imgWidth = 20; // Ancho de la imagen en el encabezado (ajústalo según tu necesidad)
    const imgHeight = 10; // Altura de la imagen en el encabezado (ajústalo según tu necesidad)
    pdf.addImage(imageSrc, 'JPEG', pdfMargins.left, 10, imgWidth, imgHeight);
  };

  // Función para agregar el pie de página en cada página
  const addFooter = (dato:any) => {
    const pageCount =  (pdf as any).internal.getNumberOfPages();
    pdf.setFontSize(10);
    pdf.text(`Página ${dato}`, pdfMargins.left, pageSize.height - pdfMargins.bottom + 10);
  };

  html2canvas(DATA).then((canvas) => {
    

    // Calcular el tamaño del contenido del canvas teniendo en cuenta los márgenes
    const contentWidth = pageSize.width - pdfMargins.left - pdfMargins.right;

    // Agregar el contenido del canvas al PDF, comenzando desde los márgenes
    //pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', pdfMargins.left, pdfMargins.top, contentWidth, contentHeight);
    
    // Llamar a la función addHeader() para agregar el encabezado en cada página


    pdf.setFontSize(12); // Tamaño de fuente
    const tableColumn = [['Referencia',
      'Monto Recibido',
      'Monto Enviado',
      'Valor Tipo Cambio',
      'Comision(fee)',
      'Usuario',
      'Fecha Registro',
      'Hora Registro']];
    const tableRows: any[] = [];

    this.agentes.forEach(item => {
      const rowData = [
        item.referencia.toString(),
        item.montorec.toString() + " " + item.divisarec,
        item.montoenv.toString() + " " + item.divisaenv,
        item.tcambio.toString(),
        item.fee.toString(),
        item.userid.toString(),
        item.fecharegistro.toString(),
        item.horaregistro.toString()
      ];
      tableRows.push(rowData);
    });

    // Agregar una tabla
    (pdf as any).autoTable({
      head: tableColumn,
      body: tableRows,
      startY: pdfMargins.top  , // El 30 es un espaciado entre el contenido y la tabla
    });
    pdf.setPage(1);
      addHeader();
        const totalPages =  (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(i);
    }

    pdf.save('angular-demo.pdf');
  });
}

  
  title = 'export-table-data-to-pdf-using-jspdf-example';

  head = [['Referencia','Monto Recibido',  'Monto Enviado',  'Valor Tipo Cambio',  'Comision(fee)',  'Usuario',  'Fecha Registro',  'Hora Registro']]
  buscar_() {
    let datos = {
      option:this.opcion,
      mes: this.mesSeleccionado,
      mes2: this.mesActual,
      usesrid: this.agencia,
      year:this.year
    }
    /**this.ss.reportespagos(datos).subscribe(
      (data1: any) => {
        this.dataSource.data = data1[0].reportes.data
      },
      (error: any) => {
        console.log('Error al obtener las agencias:', error);
      }
    );*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportarAExcel(): void {
    const fechaActual = new Date();
    
    // Formatear la fecha como dd-mm-yyyy
    const fechaFormateada = `${fechaActual.getDate()}-${fechaActual.getMonth() + 1}-${fechaActual.getFullYear()}`;
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'datos');
    XLSX.writeFile(wb, fechaFormateada+'.xlsx');
  }
}