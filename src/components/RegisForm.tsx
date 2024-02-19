import React, { useState , useEffect } from 'react';
import "../assets/css/App.css"
import { Link , useNavigate } from 'react-router-dom';
import type { FormData } from '@/Types/data.types';


function RegisForm() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<File | null>(() => null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    taxId: '',
    fullName: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    website: '',
    address: '',
    state: '',
    city: '',
    subCity: '',
    zipCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


   // จัดการ Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
    localStorage.setItem('userData', JSON.stringify(formData));
  
    if (uploadedImage) {
      const imageData = {
        name: uploadedImage.name,
        size: uploadedImage.size,
        type: uploadedImage.type,
        dataUrl: imageUrl, 
      };
      localStorage.setItem("uploadedImage", JSON.stringify(imageData));
      setUploadedImage(uploadedImage);
    }
  
    console.log(formData);
    console.log('Uploaded Image:', uploadedImage);

    navigate('/');
  };
  
  // validateForm เพื่อตรวจสอบข้อมูล
  const validateForm = () => {
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // ตรวจสอบ password
    if (!formData.password || formData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return false;
    }

    // ตรวจสอบ confirmPassword
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    return true;
  };

  // ซ่อน และ แสดง พาสเวิร์ด
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Add รูปภาพ
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];

      setImage((prevState) => {
        if (prevState === null) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result && typeof reader.result === 'string') {
              setImageUrl(reader.result);
              console.log('Image URL:', reader.result);
            }
          };
          reader.readAsDataURL(selectedImage);

          return selectedImage;
        } else {
          return prevState;
        }
      });
    }
  };

  useEffect(() => {
    if (image) {
      const imageData = {
        name: image.name,
        size: image.size,
        type: image.type,
        dataUrl: imageUrl,
      };
      localStorage.setItem("uploadedImage", JSON.stringify(imageData));
      setUploadedImage(image);
    }
  }, [image, imageUrl]);


  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className=" flex justify-center items-center">
        <div className=" w-[1263px] h-[911px] bg-white rounded-[20px] drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] mt-[122px] mb-[42px]">
          <div className=" flex justify-center items-center ">
            <div className="w-[1128px] h-[728px] mt-[35px]">
              <div className="w-[150px] h-[150px] mx-auto rounded-full border border-[#021E42] mb-[24px] flex justify-center items-center ">
                <input
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  onChange={handleChangeImg}
                  style={{ display: 'none' }}
                />
                <label htmlFor="uploadImage" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    className="w-full h-full"
                    src={imageUrl || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNDk5OTk5OTk5OTk5OTk5OCwwLDAsMC40OTk5OTk5OTk5OTk5OTk4LDYsNS43NTU2MjQyOTQyODEwMDUpIj48cGF0aCBkPSJNMjEuNzUgMTF2NkEzLjM4MyAzLjM4MyAwIDAgMSAxOCAyMC43NUg2QTMuMzgzIDMuMzgzIDAgMCAxIDIuMjUgMTdWN0EzLjM4MyAzLjM4MyAwIDAgMSA2IDMuMjVoN2EuNzUuNzUgMCAwIDEgMCAxLjVINmMtMS41NzcgMC0yLjI1LjY3My0yLjI1IDIuMjV2OS4yNWwyLjU0LTIuNTRhMS4wMDggMS4wMDggMCAwIDEgMS40MiAwbC45NC45NGEuNS41IDAgMCAwIC43IDBsNC45NC00Ljk0YTEuMDA4IDEuMDA4IDAgMCAxIDEuNDIgMGw0LjU0IDQuNTRWMTFhLjc1Ljc1IDAgMCAxIDEuNSAwek03Ljk5MyA3Ljc1YTEuMjUzIDEuMjUzIDAgMSAwIC4wMDcgMHptOS4wMDctMmgxLjI1VjdhLjc1Ljc1IDAgMCAwIDEuNSAwVjUuNzVIMjFhLjc1Ljc1IDAgMCAwIDAtMS41aC0xLjI1VjNhLjc1Ljc1IDAgMCAwLTEuNSAwdjEuMjVIMTdhLjc1Ljc1IDAgMCAwIDAgMS41eiIgZmlsbD0iIzAyMWU0MiIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4="}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-[16px] font-medium text-gray-700">Email</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-[#021E42]">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.9 6c.4.3.8.3 1.2 0l7.9-6M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className=" w-full ps-12 p-2 border rounded-md mt-1 mb-1 mr-1" />
                  </div>
                </div>
                <div className="col-span-1">
                  <label htmlFor="password" className="block text-[16px] font-medium text-gray-700">Password</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-[#021E42]">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full ps-12 p-2 border rounded-md mt-1 mb-1 mr-1" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 end-0 px-1 h-full text-sm font-medium text-[#021E42]"
                    >
                      {showPassword ? (
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-span-1">
                  <label htmlFor="password" className="block text-[16px] font-medium text-gray-700">Confirm Password</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-[#021E42]">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z" />
                      </svg>
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Your Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full ps-12 p-2 border rounded-md mt-1 mb-1 mr-1" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-0 end-0 px-1 h-full text-sm font-medium text-[#021E42]"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className=" my-[32px] border-[#D9D9D9] ">
                <hr />
              </div>
              <div className=" my-[10px] ">
                <h1 className="text-[#255FA8] font-semibold text-[20px] ">Information</h1>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-[24px]">
                <div className="col-span-1">
                  <label htmlFor="companyName" className="block text-[16px] font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter your Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="col-span-1">
                  <label htmlFor="tax" className="block text-[16px] font-medium text-gray-700">Tax ID</label>
                  <input
                    type="text"
                    id="taxId"
                    name="taxId"
                    placeholder="Enter your Tax ID"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div className="col-span-1">
                  <label htmlFor="fullName" className="block text-[16px] font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-[24px]">
                <div className="col-span-1">
                  <label htmlFor="country" className="block text-[16px] font-medium text-gray-700">Country</label>
                  <div className="relative mb-6">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChangeSelect}
                      className="mt-1 p-2 w-full border rounded-md appearance-none"
                    >
                      <option value="" disabled selected>Select a country</option>
                      <option value="usa">United States</option>
                      <option value="canada">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="th">Thailand</option>
                    </select>
                    <div className="absolute top-0 end-0 px-1 h-full text-sm font-medium text-[#021E42] flex items-center justify-center ">
                      <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label htmlFor="phoneNumber" className="block text-[16px] font-medium text-gray-700">Phone Number</label>
                  <div className="flex">
                    <div className="flex-none pr-2">
                      <div className="relative mb-6">
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChangeSelect}
                          className="mt-1 p-2 pr-5 border rounded-md appearance-none">
                          <option value="" disabled selected>+00</option>
                          <option>+54</option>
                          <option>+64</option>
                          <option>+75</option>
                          <option>+66</option>
                        </select>
                        <div className="absolute top-0 end-0 px-1 h-full text-sm font-medium text-[#021E42] flex items-center justify-center"><svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                        </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label htmlFor="website" className="block text-[16px] font-medium text-gray-700">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="Enter your Website"
                    value={formData.website}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-[24px]">
                <div className="col-span-1 ">
                  <label htmlFor="address" className="block text-[16px] font-medium text-gray-700">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your Address"
                    value={formData.address}
                    onChange={handleChangeTextArea}
                    className="mt-1 p-2 w-full border rounded-md h-[136px] resize-none" />
                </div>
                <div className="col-span-1">
                  <label htmlFor="state" className="block text-[16px] font-medium text-gray-700">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter your State/Province"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
                  <div className="col-span-1 mt-[24px]">
                    <label htmlFor="city" className="block text-[16px] font-medium text-gray-700">City/District</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter your City/District"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md" />
                  </div>
                </div>
                <div className="col-span-1">
                  <label htmlFor="subDistrict" className="block text-[16px] font-medium text-gray-700">Sub-District</label>
                  <input
                    type="text"
                    id="subCity"
                    name="subCity"
                    placeholder="Enter your Sub-District"
                    value={formData.subCity}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
                  <div className="col-span-1 mt-[24px]">
                    <label htmlFor="zipCode" className="block text-[16px] font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="Enter your Zip Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Link to="/" className=" w-[160px] h-[48px] rounded-full bg-[#021E42] drop-shadow-md text-[20px] font-semibold text-[#FFFFFF] flex items-center justify-center" >Cancel</Link>
                <button type="submit" className=" w-[160px] h-[48px] rounded-full bg-[#5FC198] drop-shadow-md text-[20px] font-semibold text-[#FFFFFF] flex items-center justify-center" >Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form >
    </>
  )
}

export default RegisForm
