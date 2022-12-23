import React from 'react';

function Login() {

    const[email,setEmail] = React.useState('')
    const[password,setPassword] = React.useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        if(email.toLocaleLowerCase() == 'admin@gmail.com' && password.toLocaleLowerCase() == 'admin@123') {
            localStorage.setItem('user', email)
            location.reload()
        }else {
            alert("Invalid credentials")
        }
    }


  return (
    <>
        <div className="login" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('5291450.jpg')`}}>
            <div className="row justify-content-center center-div">
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body py-4 px-4">
                            <form onSubmit={handleLogin}>
                                <h2 className="text-center">LOGIN HERE</h2>
                                <div className="form-group">
                                    <label htmlFor="">Email</label>
                                    <input onChange={e => setEmail(e.target.value)} required type="email" className='form-control' placeholder='Enter email' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input onChange={e => setPassword(e.target.value)} required type="password" className='form-control' placeholder='Enter password' />
                                </div>
                                <div className="form-group text-center">
                                    <button className='btn btn-primary rounded' type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login