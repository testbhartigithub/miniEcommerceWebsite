import { useState } from "react";
import "./CheckOutForm.css"

export default function CheckOutForm({onSubmit}){
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        address:"",
    })

    const[errors,setErrors]=useState({})
    const[isSubmitting,setIsSubmitting]=useState(false)

    const validateForm=()=>{
        const newErrors={}
        if(!formData.name.trim()){
            newErrors.name="Name is required"
        }
        if(!formData.email.trim()){
            newErrors.email="Email is required"
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
           newErrors.email = "Please enter a valid email"
        }
        if(!formData.address.trim()){
            newErrors.address="Address is required"
        }
        else if(formData.address.trim().length<10){
            newErrors.address="Address must be at least 10 characters"
        }
        return newErrors
    }

    const handleChange=(e)=>{
        const{name,value}=e.target
        setFormData((prev)=>({...prev,[name]:value,}))
        if(errors[name]){
            setErrors((prev)=>({...prev,[name]:""}))
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length === 0) {
         setIsSubmitting(true)
         setTimeout(() => {
          onSubmit(formData)
        }, 500)
       } else {
      setErrors(newErrors)
      }
    }

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2 className="form-title">Shipping Information</h2>
            <div className="form-field">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type='text' id="name" name="name" value={formData.name} 
                    onChange={handleChange} placeholder="Enter your Name"
                    className={`form-input ${errors.name?"errors":""}`}/>
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                 <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type='email' id="email" name="email" value={formData.email} 
                    onChange={handleChange} placeholder="Enter your Email"
                    className={`form-input ${errors.email?"errors":""}`}/>
                    {errors.name && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address" className="form-label">Shipping Address</label>
                    <input type='text' id="address" name="address" value={formData.address} 
                    onChange={handleChange} placeholder="Enter your address"
                    className={`form-input ${errors.address?"errors":""}`}/>
                    {errors.address && <p className="error-text">{errors.address}</p>}
                </div>
                
                <button type="submit" disabled={isSubmitting} 
                className="submit-button">{isSubmitting?"Processing...":"Place Order"}</button>

            </div>
        </form>
    )
}
