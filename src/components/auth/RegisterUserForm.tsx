import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { userAPI } from '../../services/UserService';
import { IUser } from '../../models/IUser';
import classes from '../auth/RegisterUserForm.module.css'



const RegisterUserForm = () => {
    // const [createUser, {}] = userAPI.useCreateUserMutation()
    
    const [createUser, infoCreateUser] = userAPI.useCreateUserMutation()
    // const [createUserError, {}] = userAPI.use


    const [user, setUser] = useState({email: '', password: '', gender: '', first_name: '', last_name: '', patronymic: '', date_of_birth: ''})
    const [flag, setFlag] = useState({flag1: false, flag2: false})
    
    // Валидация
    const [userDirty, setUserDirty] = useState({email: false, password: false, first_name: false, last_name: false, patronymic: false, date_of_birth: false})
    const [userError, setUserError] = useState({email: 'Поле Почта не может быть пустым.', password: 'Поле Пароль не может быть пустым.', gender: 'Вам необходимо выбрать Пол.', first_name: 'Поле Имя не может быть пустым.',  last_name: 'Поле Фамилия не может быть пустым.', patronymic: 'Поле Отчество не может быть пустыми', date_of_birth: 'Необходимо выбрать дату рождения.'})
    const [formValid, setFormValid] = useState(false)
    const [formDirty, setFormDirty] = useState(false)

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setUserDirty({...userDirty, email: true})
                break;
            case 'password':
                setUserDirty({...userDirty, password: true})
                break;
            case 'first_name':
                setUserDirty({...userDirty, first_name: true})
                break;
            case 'last_name':
                setUserDirty({...userDirty, last_name: true})
                break;
            case 'patronymic':
                setUserDirty({...userDirty, patronymic: true})
                break;
            case 'date_of_birth':
                setUserDirty({...userDirty, date_of_birth: true})
                break;
            default:
                break;
        }
    }

    const emailHandler = (e: any) => {
        setUser({...user, email: e.target.value})
        const re = /^\S+@\S+\.\S+$/;
        if (!re.test(String(e.target.value).toLocaleLowerCase())) {
            setUserError({...userError, email: 'Некорректный e-mail.'})
        } else {
            setUserError({...userError, email: ''})
        }
    }
    const lastNameHandler = (e: any) => {
        setUser({...user, last_name: e.target.value})
        if (e.target.value.length < 1) {
            setUserError({...userError, last_name: 'Поле Фамилия не может быть пустым.'})
        } else { 
            setUserError({...userError, last_name: ''})
        }
    }
    const passwordHandler = (e: any) => {
        setUser({...user, password: e.target.value})
        if (e.target.value.length < 8) {
            setUserError({...userError, password: 'Длина пароля должна быть не менее 8 символов.'})
        } else { 
            setUserError({...userError, password: ''})
        }
    }
    const firstNameHandler = (e: any) => {
        setUser({...user, first_name: e.target.value})
        if (e.target.value.length < 1) {
            setUserError({...userError, first_name: 'Поле Имя не может быть пустым.'})
        } else { 
            setUserError({...userError, first_name: ''})
        }
    }
    const patronymicHandler = (e: any) => {
        setUser({...user, patronymic: e.target.value})
        if (e.target.value.length < 1) {
            setUserError({...userError, patronymic: 'Поле Отчество не может быть пустым.'})
        } else { 
            setUserError({...userError, patronymic: ''})
        }
    }
    const dateOfBirthHandler = (e: any) => {
        setUser({...user, date_of_birth: e.target.value})
        if (e.target.value != "") {
            setUserError({...userError, date_of_birth:""})
        }
    }


    useEffect(() => {
        if (userError.email || userError.first_name || userError.last_name || userError.password || userError.patronymic || userError.date_of_birth || (!flag.flag1 && !flag.flag2)) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
        if (userDirty.email || userDirty.first_name || userDirty.last_name || userDirty.password || userDirty.patronymic || userDirty.date_of_birth) {
            setFormDirty(true)
        } else {
            setFormDirty(false)
        }
    }, [userError, flag, userDirty])

    const handleCreate = async (e: any) => {
        e.preventDefault()

        await createUser({
            "email": user.email,
            "password": user.password,
            "gender": user.gender,
            "is_active": true,
            "is_superuser": false,
            "is_verified": false,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "patronymic": user.patronymic,
            "date_of_birth": user.date_of_birth
          } as IUser)
        console.log(infoCreateUser);
    }
    

    return (
        <div className={classes.UserForm}>
            <h1 className={classes.Title}>Регистрация</h1>
            {(!formValid && formDirty) && <div className={classes.Error}>Все поля формы должны быть заполнены и валидны.</div>}
   
            <form className={classes.MainForm}  action="">

                {(userDirty.last_name && userError.last_name) && <div className={classes.Error}>{userError.last_name}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Фамилия</label>
                    <input className={classes.UserFormItem}
                    value={user.last_name}
                    name = 'last_name'
                    type="text"
                    onBlur={e => blurHandler(e)}
                    onChange={e => lastNameHandler(e)}
                    placeholder='Еланский'
                    />
                </div>
                {(userDirty.first_name && userError.first_name) && <div className={classes.Error}>{userError.first_name}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Имя</label>
                    <input className={classes.UserFormItem}
                    name="first_name"
                    type="text"
                    onBlur={e => blurHandler(e)}
                    onChange={e => firstNameHandler(e)}
                    placeholder='Дмитрий'/>
                </div>

                {(userDirty.patronymic && userError.patronymic) && <div className={classes.Error}>{userError.patronymic}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Отчество</label>
                    <input className={classes.UserFormItem}
                    value={user.patronymic}
                    name="patronymic"
                    type="text"
                    onBlur={e => blurHandler(e)}
                    onChange={e => patronymicHandler(e)}
                    placeholder='Олегович'/>
                </div>

                {(userDirty.date_of_birth && userError.date_of_birth) && <div className={classes.Error}>{userError.date_of_birth}</div>}
                    <label className={classes.LabelBox} htmlFor="">Дата рождения</label>
                    <input type="date" id="start"
                    name="date_of_birth"
                    value={user.date_of_birth}
                    onBlur={e => blurHandler(e)}
                    onChange={e => dateOfBirthHandler(e)}
                    />
                    


                <label className={classes.LabelBox} htmlFor="">Пол</label>
                <div className={classes.checkboxForm}>
                    <div className={classes.checkboxFormItem}>
                        <input type="checkbox" id="m" name="m"
                        onChange={e => [setUser({...user, gender: "m"}), setFlag({...flag, flag1: true, flag2: false})]}
                        checked={flag.flag1} />
                        <label htmlFor="m">Мужской</label>
                    </div>

                    <div className={classes.checkboxFormItem}>
                        <input type="checkbox" id="w" name="w" 
                        onChange={e => [setUser({...user, gender: "w"}), setFlag({...flag, flag1: false, flag2: true})]}
                        checked={flag.flag2} />
                        <label htmlFor="w">Женский</label>
                    </div>
                </div>
                

                {(userDirty.email && userError.email) && <div className={classes.Error}>{userError.email}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Почта</label>
                    <input className={classes.UserFormItem}
                    value={user.email}
                    name = 'email'
                    type="e-mail"
                    onBlur={e => blurHandler(e)}
                    onChange={e => emailHandler(e)}
                    placeholder='elan.dmitriy@gmail.com'/>
                </div> 

                {(userDirty.password && userError.password) && <div className={classes.Error}>{userError.password}</div>}
                <div className={classes.ItemBox}>
                    <label className={classes.LabelBox} htmlFor="">Пароль</label>
                    <input className={classes.UserFormItem}
                    value={user.password}
                    name="password"
                    type="password"
                    onBlur={e => blurHandler(e)}
                    onChange={e => passwordHandler(e)}
                    placeholder='**********'
                    />
                </div>
                {infoCreateUser.isError && <div className={classes.Error}>Пользовать с данным e-mail уже зарегистрирован.</div>}
                {!infoCreateUser.isError && <div className={classes.notError}>Пользователь упешно зарегистрировался.</div>}
                <button className={classes.Btn}
                disabled={!formValid}
                onClick={handleCreate}
                >Зарегистрироваться</button>
            </form>

        </div>
    );
};

export default RegisterUserForm;