import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const $: any;
@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css'],
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');

    this.table1 = $('#table1').DataTable();
    this.bind_mahasiswa();
  }

  ngOnInit(): void {}

  bind_mahasiswa(): void {
    this.http
      .get('https://stmikpontianak.net/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        console.log(data);

        this.table1.clear();

        data.forEach((element: any) => {
          var tempatTanggalLahir =
            element.TempatLahir + ', ' + element.TanggalLahir;

          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggalLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk,
          ];

          this.table1.row.add(row);
        });

        this.table1.draw(false);
      });
  }

  showTambahModal(): void {
    $('#tambahModal').modal();
  }

  postRecord(): void {
    var alamat = $('#alamatText').val();
    var jenisKelamin = $('#jenisKelaminText').val();
    var jp = $('#jpSelect').val();
    var nama = $('#namaText').val();
    var nim = $('#nimText').val();
    var statusNikah = $('#statusNikahSelect').val();
    var tahunMasuk = $('#tahunMasukText').val();
    var tanggalLahir = $('#tanggalLahirText').val();
    var tempatLahir = $('#tempatLahirText').val();

    if (nim.length == 0) {
      alert('NIM Belum Diisi');
      return;
    }

    if (nama.length == 0) {
      alert('Nama Belum Diisi');
      return;
    }

    if (tempatLahir.length == 0) {
      alert('Tempat Lahir Belum Diisi');
      return;
    }

    if (tanggalLahir.length == 0) {
      alert('Tanggal Lahir Belum Diisi');
      return;
    }

    if (alamat.length == 0) {
      alert('Alamat Belum Diisi');
      return;
    }

    if (tahunMasuk.length == 0) {
      alert('Tahun Masuk Belum Diisi');
      return;
    }

    alamat = encodeURIComponent(alamat);
    jenisKelamin = encodeURIComponent(jenisKelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tanggalLahir = encodeURIComponent(tanggalLahir);
    tempatLahir = encodeURIComponent(tempatLahir);

    var url = 'https://stmikpontianak.net/011100862/tampilMahasiswa.php';
    '?alamat=' +
      alamat +
      '&jenisKelamin=' +
      jenisKelamin +
      '&jp=' +
      jp +
      '&nama=' +
      nama +
      '&nim=' +
      nim +
      '&statusPernikahan=' +
      statusNikah +
      '&tahunMasuk=' +
      tahunMasuk +
      '&tanggalLahir=' +
      tanggalLahir +
      '&tempatLahir=' +
      tempatLahir;

    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      alert(data.status + ' --> ' + data.message);

      this.bind_mahasiswa();
      $('#tambahModal').modal('hide');
    });
  }
}
