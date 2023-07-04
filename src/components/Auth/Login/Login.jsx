import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import '../index.css'
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { openNotification } from "../../Notification/Notification";


export const emailRegister = { required: 'Обязательное поле для заполнения!' }
export const passwordRegister = {
    required: {
        value: true,
        message: 'Обязательное поле для заполнения!'
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
    }
}

export const LoginForm = () => {

    const [type, setType] = useState(true)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const sendData = async (data) => {
        try {
            const res = await api.signin(data);
            localStorage.setItem('token', res.token);
            navigate('/')
            openNotification("success", "Успешно", "Вы вошли");
        } catch (error) {
            openNotification("error", "Ошибка", "Неправильный логин/пароль");
        }
    }

    return (
        <div className="incontent" >
            <h3>Авторизация</h3>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                <div>
                    <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="password" />
                    <span onClick={() => setType(!type)} className={`form__pass__icon`}>{type ? '0' : 'X'}</span>
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div className="auth__links">
                    <Link className="auth__link" to={'/register'}>Регистрация</Link>
                    <Link className="auth__link" to={'/reset-pass'}>Забыли пароль?</Link>
                </div>
                <button className="btn btn_type_primary" type="submit">Войти</button>
            </form>
        </div>
    )
}