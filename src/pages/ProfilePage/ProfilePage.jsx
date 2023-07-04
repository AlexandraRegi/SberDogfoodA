import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyUser, updateUser } from '../../storage/slices/userSlice'
import './index.css'
import { useForm } from 'react-hook-form'


export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: user, loading}  = useSelector(s => s.user)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" });

    useEffect(() => {
        dispatch(getMyUser())
    }, [dispatch])

    const sendData = data => {
        dispatch(updateUser(data));
        reset()
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            Profile
            {loading || !user._id ? 'loading' :
                <div className='profile'>
                    <div>
                        <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                            <div>
                                <input className="form__input" type="text" {...register("name")} placeholder="name" defaultValue={user.name} />
                            </div>
                            <div className="form__pass">
                                <input className="form__input" type="text" {...register("about")} placeholder="about me" defaultValue={user.about} />
                            </div>

                            <button className='btn btn_type_primary' type="submit">Send</button>
                        </form>
                    </div>
                    <div>
                    <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                        <img src={user?.avatar} className='profile__avatar' alt='this is avatar' />
                            <div>
                                <input className="form__input" type="text" {...register("avatar")} placeholder="avatar" />
                            </div>
                            <button className='btn btn_type_primary' type="submit">Send</button>
                        </form>
                        <button className='btn btn_type_primary' onClick={logout}>Logout</button>
                    </div>
                </div>
            }
            {/* {errors ? } */}
        </>
    )
}