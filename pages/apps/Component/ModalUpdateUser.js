

import { Height } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import axios from "axios";
const Select = dynamic(() => import("react-select"), { ssr: false });


const UpdateUser = ({open, setOpen, setOpenLoader}) => {
    const [branch, setBranch] = useState([]);
    const [role, setRole] = useState([]);
    const [dataUser, setDataUser] = useState({
        user_id: '',
        nama: '',
        username: '',
        password: '',
        email: '',
        role: '',
        branch: ''
    })
    useEffect(() => {
        getBranch();
        getRole();

        setDataUser({
            user_id: open.user_id,
            nama: open.user.nama,
            username: open.user.username ?? undefined,
            email: open.user.email,
            role: open.user.role?.kode_role ?? undefined,
            branch: open.user.branch?.kode_branch ?? undefined
        })
        // console.log(open.user.role.id_role);
    },[open.open_modal]);
     const updateUserData = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setOpenLoader(true);
        try {
            const response = await axios.patch(apiUrl+"/users/update?id="+dataUser.user_id, {
                nama_perusahaan: dataUser.nama,
                username: dataUser.username,
                password: dataUser.password,
                email: dataUser.email,
                kode_role: dataUser.role,
                kode_branch: dataUser.branch,
                isApproval: 1
            } ,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            });
            const data = response.data;
            if(data.success){
                setOpenLoader(false);
                setOpen({...open, open_modal: false});
                swalAlert(data.message, "Success", "success");
           
            }
            
        } catch (error) {
            console.log(error);
            // setError(error.message);
            setOpenLoader(false);
            swalAlert(error.message, error.status, "error");
        }
     }
     
     const getBranch = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setOpenLoader(true);
        try {
            const response = await axios.get(apiUrl+"/master/get-branch", {
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = response.data.data;
            if(data){
                setOpenLoader(false);
                const branchArr = [];
                for await (const b of data){
                    branchArr.push({
                        value:b.kode_branch,
                        label: b.nama_branch
                    })
                }
                setBranch(branchArr);
            }
            
        } catch (error) {
            console.log(error);
            // setError(error.message);
            setOpenLoader(false);
            swalAlert(error.message, error.status, "error");
        }
    }
     const getRole = async() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        setOpenLoader(true);
        try {
            const response = await axios.get(apiUrl+"/role/get-role", {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            const data = response.data.data;
            if(data){
                setOpenLoader(false);
                const roleArr = [];
                for await (const b of data){
                    roleArr.push({
                        value:b.kode_role,
                        label: b.nama_role
                    })
                }
                setRole(roleArr);
            }
            
        } catch (error) {
            console.log(error);
            // setError(error.message);
            setOpenLoader(false);
            swalAlert(error.message, error.status, "error");
        }
     }
    const swalAlert = (message, title, icon) => {
        let timerInterval;

        Swal.fire({
            title: title,
            html: message,
            icon: icon,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
    }

 return(
    <Rodal onClose={() => setOpen({...open, open_modal: false})} visible={open.open_modal} animation='flip' height={650}
    >
        <h6 className='modal-header'>Update User</h6>
        <div className='modal-body'>
                <div className="row gy-2 pb-3">
                <Col xl={12}>
                    <label htmlFor="contact-address-firstname" className="form-label ">Nama</label>
                    {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                    <input type="text" className="form-control" id="contact-address-firstname" value={dataUser.nama} placeholder="Nama" onChange={(e) => setDataUser({...dataUser, nama: e.target.value})} />
                </Col>
                <Col xl={12}>
                    <label htmlFor="username" className="form-label ">Username</label>
                    {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                    <input type="text" className="form-control" id="contact-address-firstname" value={dataUser.username} placeholder="Username" onChange={(e) => setDataUser({...dataUser, username: e.target.value})} />
                </Col>
                <Col xl={12}>
                    <label htmlFor="password" className="form-label ">Password</label>
                    {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                    <input type="password" className="form-control" id="contact-address-firstname" value={dataUser.password} placeholder="Password" onChange={(e) => setDataUser({...dataUser, password: e.target.value})} />
                </Col>
                <Col xl={12}>
                    <label htmlFor="email" className="form-label ">Email</label>
                    {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                    <input type="text" className="form-control" id="contact-address-firstname" value={dataUser.email} placeholder="Email" onChange={(e) => setDataUser({...dataUser, email: e.target.value})}/>
                </Col>
                <Col xl={12}>
                    <label htmlFor="username" className="form-label ">Role</label>
                    {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                    <Select name="state" options={role}  className="basic-multi-select " value={role.find(opt => opt.value === dataUser.role)} isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={(e) => setDataUser({...dataUser, role: e.value})}  />
                </Col>
                <Col xl={12}>
                    <label htmlFor="username" className="form-label ">Branch</label>
                    {/* <input type="text" className="form-control" id="contact-address-firstname" placeholder="Website" /> */}
                    <Select name="state" options={branch}  className="basic-multi-select " value={branch.find(opt => opt.value === dataUser.branch)} isSearchable menuPlacement='auto' classNamePrefix="Select2" onChange={(e) => setDataUser({...dataUser, branch: e.value})} />
                </Col>
                </div>
            
        </div>
        <div className='modal-footer'>
            <Button className="me-2" variant="primary" onClick={updateUserData}>Update</Button>
            <Button variant="secondary" onClick={() => setOpen({...open, open_modal: false})}>Close</Button>
        </div>
    </Rodal>
 )
}

export default dynamic(() => Promise.resolve(UpdateUser), { ssr: false });