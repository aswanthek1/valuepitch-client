import React from "react";
import "./Form.css";

const Form = () => {
  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div>
            <h4>Register here</h4>
          </div>
          <form action="">
       <div className="user-details">
       <div className="input-box">
              <input type="text" name="" id="" className="input" />
            </div>
            <div className="input-box">
              <input type="text" name="" id="" />
            </div>
            <div className="input-box">
              <input type="text" name="" id="" />
            </div>
            <div className="input-box">
              <input type="text" name="" id="" />
            </div>
            <div className="input-box">
              <input type="text" name="" id="" />
            </div>
       </div>
          </form>
        </div>
      </div> */}
<div className="container">
    <section className='heading'>
        <h1 style={{textAlign:'center'}}>
          Register
        </h1>
        <p style={{textAlign:'center'}}>Please create an account</p>
      </section>

      <section className='form'>
        <form >
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              placeholder='Enter your name'
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              placeholder='Confirm password'
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
};

export default Form;
