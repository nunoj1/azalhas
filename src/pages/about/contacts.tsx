import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formBody = {
      name,
      email,
      message
    };
  };

  return (
    <div>


      <div className='mb-8'>
        <p>Nesta página, você pode entrar em contato conosco para tirar dúvidas, fazer sugestões ou relatar problemas.
          Nós sempre estamos dispostos a ouvir o que você tem a dizer e faremos o possível para ajudá-lo da melhor maneira possível.
        </p>
        <br />
        <p>

          Para entrar em contato, basta preencher o formulário abaixo com seus dados e a mensagem que deseja enviar. Nós responderemos o mais rápido possível.
        </p>
        <br />
        <p>
          Além disso, você também pode nos encontrar nas redes sociais e enviar mensagens diretas para obter atendimento imediato.
        </p>
        <br />
        <p>
          Agradecemos por entrar em contato e esperamos poder ajudá-lo em breve.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto w-full px-32 text-left">
        <div className="mb-4 ">
          <label className="text-xl mr-6" htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 items-center">
          <label className="text-xl mr-6" htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded-lg"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 items-center">
          <label className="text-xl mr-6" htmlFor="message">Mensagem:</label>
          <textarea
            name="message"
            className="w-full h-32 p-2 border rounded-lg"
            value={message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
