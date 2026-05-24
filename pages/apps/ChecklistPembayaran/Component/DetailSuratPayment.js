
import { Divider, List, ListItem, ListItemText, Paper, Typography, Container, Button, Stack, Box, Grid, Modal } from "@mui/material";
import Link from "next/link";
import { Fragment, useRef } from "react";
import Seo from "@/shared/layout-components/seo/seo";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "@/public/assets/images/brand-logos/logo-umira.png";


const DetailSuratPayment = ({ data }) => {
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
            {console.log("paper " + JSON.stringify(data))}
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
                    Verifikasi Dokumen Pembayaran
                </Typography>
                {/* <Typography variant="body2" align="center" gutterBottom>
                    No : {data?.no_skt ?? `NO SKT Database`}
                </Typography> */}

                <Divider sx={{ my: 2 }} />

                {/* <Typography variant="body1" paragraph>
                    Kepada Yth : <br />
                    {data?.nama_perusahaan ?? `Seluruh Vendor / Supplier / Mandor`} <br />
                    Di – tempat
                </Typography> */}
                <Typography variant="subtitle1" paragraph align="justify">
                    Kode Transaksi : {data?.kode_transaksi ?? "kode Transaksi"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" paragraph align="justify">
                    Nama Pemohon : {data?.user_pengajuan?.nama ?? `Nama`}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" paragraph align="justify">
                    Tanggal Pengajuan : {data?.tanggal_pengajuan ?? `Tanggal Pengajuan`}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" paragraph align="justify">
                    Proyek : {data?.proyek ?? `Nama Proyek`}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" paragraph align="justify">
                    Jenis Transaksi : {data?.jenis_transaksi ?? `Jenis Transaksi`}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" paragraph align="justify">
                    Berikut hasil verifikasi dokumen :
                </Typography>

                {/* Table */}

                <ul className="list-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data?.detailTransaksi.map((item, index) => (
                        <li
                            key={index}
                            className={`list-group-item ${(item.checklist == 1) ? "list-group-item-success" : "list-group-item-danger"} d-flex align-items-center gap-2`}
                            style={{ borderRadius: '8px' }}
                        >
                            <i className="bi bi-check-circle-fill"></i>
                            {item.pertanyaan}
                        </li>
                    ))}
                </ul>


                {/* <Typography variant="body1" paragraph align="justify">
                    Dengan ketentuan no skt tersebut dapat dipergunakan untuk pengadaan barang/jasa di lokasi kerja aktif tersebut,
                    selama tidak ada salah satu dari dokumen pendukung yang habis
                    masa berlakunya dan/atau point penilaian kinerja terhadap perusahaan saudara tidak dalam kategori <b>merah</b> atau <b>hitam</b>
                </Typography>

                <Typography variant="body1" paragraph align="justify">
                    Surat Keterangan Terdaftar ini mempunyai masa berlaku selama 2 tahun dan apabila sudah habis perusahaan saudara harus melakukan renewal melalui sistem VMS (vendor management system)
                </Typography> */}


                {/* <Typography variant="body1" paragraph>
                    Surat dikeluarkan oleh system, {new Date(data?.approvedAt).toLocaleDateString("id-ID", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric"
                    }) ?? `08 September 2025`}
                </Typography> */}

                <Divider sx={{ my: 2 }} />
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={3} justifyContent="center">
                        {[
                            { label: 'Diajukan', value: data?.id_transaksi+"|"+data?.user_pengajuan?.nama+"|"+data?.tanggal_pengajuan ?? 'Test 731867126821877821', nama: data?.user_pengajuan?.nama, tanggal: data?.tanggal_pengajuan },
                            { label: 'Verifikasi', value: data?.id_transaksi+"|"+data?.approvedBy?.nama+"|"+data?.approved_at ?? 'Test 731867126821877821', nama: data?.approvedBy?.nama, tanggal: data?.approved_at },
                            { label: 'Payment', value: data?.id_transaksi+"|"+data?.paymentBy?.nama+"|"+data?.payment_at ?? 'Test 731867126821877821', nama: data?.paymentBy?.nama, tanggal: data?.payment_at },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        p: 2,
                                        textAlign: 'center',
                                        backgroundColor: 'background.paper',
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                        {item.label}
                                    </Typography>

                                    <QRCodeCanvas
                                        value={item.value}
                                        size={130}
                                        bgColor="#ffffff"
                                        fgColor="#4c4c4c"
                                        level="H"
                                        includeMargin={true}
                                        imageSettings={{
                                            src: "/assets/images/brand-logos/logo-umira.png",
                                            x: undefined,
                                            y: undefined,
                                            height: 15,
                                            width: 30,
                                            excavate: true
                                        }}
                                    />

                                    <Divider sx={{ width: '100%', my: 1 }} />

                                    <Typography variant="body2" color="text.secondary">
                                        {item.nama}
                                        {}
                                    </Typography>
                                    <Typography variant="caption" color="text.disabled">
                                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
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
            {/* <pre>{data}</pre> */}
        </Container>
        // </Fragment>
    );
}

// DetailSuratSkt.layout = "ContentlayoutVms";
export default DetailSuratPayment;