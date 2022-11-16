import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { Container, Form, Avatar } from "./styles";
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Link } from 'react-router-dom'


export function Profile(){
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  
  const [avatar, setAvatar] =  useState(avatarUrl);
  const [avatarFile, setAvatarFile] =  useState(null);
  


  async function handleUpdate(){
    const user = {
      name,
      email,
      oldPassword: passwordOld,
      password: passwordNew
    }

    await updateProfile({user, avatarFile})
  }

  function handleChangeAvatar(e){
    const file = e.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);

  }

  return(
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>

        <Avatar>
          <img
            src={avatar} 
            alt="Foto do usuário"
          />

          <label htmlFor="avatar">
            <FiCamera />
            <input 
             id="avatar"
             type="file"
             onChange={handleChangeAvatar}
            />

          </label>
        </Avatar>

        <Input
        placeholder="Nome"
        type="text"
        icon={FiUser}
        value={name}
        onChange={e => setName(e.target.value)}
        />

        <Input
        placeholder="Email"
        type="text"
        icon={FiMail}
        value={email}
        onChange={e => setEmail(e.target.value)}
        />

        <Input
        placeholder="Senha atual"
        type="password"
        icon={FiLock}
        onChange={e => setPasswordOld(e.target.value)}


        />

        <Input
        placeholder="Nova Senha"
        type="password"
        icon={FiLock}
        onChange={e => setPasswordNew(e.target.value)}

        />

        <Button title="Salvar" onClick={handleUpdate} />

      </Form>
    </Container>
  )
}