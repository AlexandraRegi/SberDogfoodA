import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import '../index.css'
import { Link } from "react-router-dom";
import { api } from "../../../utils/api";
import { emailRegister, passwordRegister } from "../Login/Login";


export const RegisterForm = () => {

    const [type, setType] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const sendData = async (data) => {
        try {
            const res = await api.signup(data);
        } catch (error) {
            alert('Oooops');
        }
    }

    return (
        <div className="incontent" >
            <h3>Регистрация</h3>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                <div>
                    <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div>
                    <input className="form__input" type="number" {...register("group")} placeholder="group" />
                    {errors?.group && <span> {errors?.group.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="password" />
                    <span onClick={() => setType(!type)} className={`form__pass__icon`}>{type ? '0' : 'X'}</span>
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="auth__link" to={'/login'}>Я уже зарегистрирован</Link>
                </div>
                <button className="btn btn_type_primary" type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}