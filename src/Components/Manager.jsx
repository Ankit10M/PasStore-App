import React from "react";
import { useRef, useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (passwordref.current.type === "password") {
      passwordref.current.type = "text";
    } else {
      passwordref.current.type = "password";
    }
  };
  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3){

      // console.log(form);
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );

    toast.success("Credentials Saved Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    
    setform({ site: "", username: "", password: "" });
  }
  else{
    toast.error("Credentials not Saved!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }
  };

  const deletePassword = (id) => {
    let c = confirm("Do You Really Want To Delete");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.success("Credentials Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    }

  };

  const editPassword = (id) => {
    const record = passwordArray.find((i) => i.id === id); // find one item
    if (record) {
      setform({
        site: record.site,
        username: record.username,
        password: record.password,
      });
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressbar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnfocusloss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-30 blur-[100px]"></div>
      </div>

      <div className="p-2 md:p-2 mycontainer ">
        <h2 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pas
          <span className="text-green-500">Store/&gt;</span>
        </h2>
        <p className="text-green-800 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            className="rounded-full px-4 py-2 border border-green-400 text-black w-full bg-white"
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            placeholder="Enter Website URL"
            id="site"
          />
          <div className="flex flex-col md:flex-row justify-between w-full gap-7 ">
            <input
              className="rounded-full p-4 py-1 border border-green-400  text-black bg-white w-full"
              value={form.username}
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Enter Username"
              id="username"
            />
            <div className="relative">
              <input
                className="rounded-full p-4 py-1 border border-green-400  text-black bg-white w-full"
                value={form.password}
                onChange={handleChange}
                type="password"
                ref={passwordref}
                name="password"
                placeholder="Enter Password"
                id="password"
              />
              <span
                className="absolute right-0 px-2 cursor-pointer"
                onClick={showPassword}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/snxksidl.json"
                  ref={ref}
                  trigger="hover"
                  colors="primary:#121331,secondary:#30e849"
                ></lord-icon>
              </span>
            </div>
          </div>

          <button
            className="text-black flex justify-center 
          items-center bg-green-500 hover:bg-green-400 
          font-bold rounded-full px-6 py-2 w-fit cursor-pointer border
           border-green-900 gap-3"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
            ></lord-icon>
            Add Credentials
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-center">
            Your Credentials
          </h2>
          {passwordArray.length === 0 && <div className="flex justify-center items-center py-10">No Credentials To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white  ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" justify-center gap-3 py-2 border border-white text-center w-32 ">
                        <div className=" flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            <span> {item.site}</span>
                          </a>
                          <div
                            className=" lordiconcopy cursor-pointer size-7 "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/hmpomorl.json"
                              trigger="hover"
                              style={{ width: "20px", height: "30px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center w-32 ">
                        <div className=" flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className=" lordiconcopy cursor-pointer size-7 "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/hmpomorl.json"
                              trigger="hover"
                              style={{ width: "20px", height: "30px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center w-32 ">
                        <div
                          className=" lordiconcopy flex items-center justify-center"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <span>{item.password}</span>
                          <div className=" cursor-pointer size-7 ">
                            <lord-icon
                              src="https://cdn.lordicon.com/hmpomorl.json"
                              trigger="hover"
                              style={{ width: "20px", height: "30px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center w-32 ">
                        <span
                          className=" cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            delay="1500"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#000000,secondary:#242424"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="morph"
                            stroke="bold"
                            state="morph-trash-in"
                            colors="primary:#000000,secondary:#242424"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
