import { Divider, List, ListItem, ListItemText, Paper, Typography, Container, Button, Stack, Box, Grid, Modal } from "@mui/material";
import Link from "next/link";
import { Fragment, useRef } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const DetailSuratSkt = ({ data }) => {
    const router = useRouter();
    const printRef = useRef();
    const download = async () => {
        const element = printRef.current;

        // ubah DOM jadi canvas
       const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // Buat PDF ukuran A4
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // halaman pertama
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // halaman berikutnya kalau ada sisa
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`Surat-SKT-${data?.no_skt ?? "Vendor"}.pdf`);
    }
    return (
        // <Fragment> 
        // <Seo title={"List Pengajuan Update VMS"} />
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper ref={printRef} elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <img
                        src='/assets/images/brand-logos/logo-umira.png'
                        alt="Umira Logo"
                        width={150}
                        height={70}
                    />
                    <Typography variant="body2" color="text.secondary">
                        PT. Umira Sinergi Global
                    </Typography>
                </Box>

                <Typography variant="h6" align="center" fontWeight="bold">
                    SURAT KETERANGAN TERDAFTAR
                </Typography>
                <Typography variant="body2" align="center" gutterBottom>
                    No : {data?.no_skt ?? `NO SKT Database`}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" paragraph>
                    Kepada Yth : <br />
                    {data?.nama_perusahaan ?? `Seluruh Vendor / Supplier / Mandor`} <br />
                    Di – tempat
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    Berdasarkan hasil verifikasi, dengan ini dinyatakan sebagai berikut :
                </Typography>



                <Grid container spacing={2} sx={{ mb: 1, mt: 2 }}>
                    <Grid item xs={5}>
                        <Typography>Nama Perusahaan</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.nama_perusahaan}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Alamat</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.alamat_perusahaan}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Direktur / Penanggung Jawab Perusahaan</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.nama_direktur + " / " + data?.nama_pic}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Telp</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.no_hp_pic + " / " + data?.no_hp_direktur}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>e-Mail</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.email_direktur}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Kualifikasi Usaha</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.kualifikasi_usaha.kualifikasi}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Klasifikasi Usaha</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.klasifikasi_usaha}</Typography>
                    </Grid>
                </Grid>




                <Typography variant="body1" paragraph align="justify">
                    <b> Lulus verifikasi, dengan</b> :
                    {/* <Link href="https://vms.simumira.com" target="_blank" underline="hover">
            https://vms.simumira.com
          </Link> */}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>No SKT</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{data?.no_skt}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Masa Berlaku</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary"> 2 Tahun</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={5}>
                        <Typography>Terhitung Tanggal</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{new Date(data?.tanggal_awal_skt).toLocaleDateString("id-ID", {
                            weekday: "long", year: "numeric", month: "long", day: "numeric"
                        })}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={5}>
                        <Typography>Tanggal Berakhir</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">{new Date(data?.tanggal_akhir_skt).toLocaleDateString("id-ID", {
                            weekday: "long", year: "numeric", month: "long", day: "numeric"
                        })}</Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1" paragraph align="justify">
                    Dengan ketentuan no skt tersebut dapat dipergunakan untuk pengadaan barang/jasa di lokasi kerja aktif tersebut,
                    selama tidak ada salah satu dari dokumen pendukung yang habis
                    masa berlakunya dan/atau point penilaian kinerja terhadap perusahaan saudara tidak dalam kategori <b>merah</b> atau <b>hitam</b>
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    Surat Keterangan Terdaftar ini mempunyai masa berlaku selama 2 tahun dan apabila sudah habis perusahaan saudara harus melakukan renewal melalui sistem VMS (vendor management system)
                </Typography>


                <Typography variant="body1" paragraph>
                    Surat dikeluarkan oleh system, {new Date(data?.approvedAt).toLocaleDateString("id-ID", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric"
                    }) ?? `08 September 2025`}
                </Typography>

                <Divider sx={{ my: 2 }} />
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center" // rata kiri
                    justifyContent="center" // posisi vertikal center
                    sx={{ height: "100%", p: 2, textAlign: "center" }}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        Di setujui
                    </Typography>

                    <QRCodeCanvas
                        value={data?.id_pengajuan ?? `Test 731867126821877821`}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#4c4c4cff"
                        level="H"
                        includeMargin={true}
                    />

                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {data?.approvedBy ?? `Test 386971829712982`}
                    </Typography>
                    <Typography variant="body2">
                        {new Date(data?.approvedAt).toLocaleDateString("id-ID", {
                            weekday: "long", year: "numeric", month: "long", day: "numeric"
                        }) ?? `Test 74920838932083280`}
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />


            </Paper>
            <Stack spacing={3}>
                {/* <Button
          variant="contained"
          color="secondary"
          fullWidth
        //   onClick={() => router.push("/apps/ListVms")}
        >
          Kembali
        </Button> */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={download}
                >
                    Download Surat (PDF)
                </Button>
            </Stack>
        </Container>
        // </Fragment>
    );
}

// DetailSuratSkt.layout = "ContentlayoutVms";
export default DetailSuratSkt;