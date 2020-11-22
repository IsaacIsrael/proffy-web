import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import "./styles.css";
import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

export default function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: "", from: "", to: "" }]);
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const newArray = Array.from(scheduleItems);
    newArray[index] = { ...newArray[index], [field]: value };

    setScheduleItems(newArray);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso");
        history.push("/");
      })
      .catch(() => alert("Error no cadastro"));
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => {
                setAvatar(event.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whats App"
              value={whatsapp}
              onChange={(event) => {
                setWhatsapp(event.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre Aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educação Física", label: "Educação Física" },
                { value: "Física", label: "Física" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={index}>
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={(event) =>
                    setScheduleItemValue(index, "week_day", event.target.value)
                  }
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quinta-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
                <Input
                  type="time"
                  name="from"
                  label="Das"
                  value={scheduleItem.from}
                  onChange={(event) =>
                    setScheduleItemValue(index, "from", event.target.value)
                  }
                />
                <Input
                  type="time"
                  name="to"
                  label="Até"
                  value={scheduleItem.to}
                  onChange={(event) =>
                    setScheduleItemValue(index, "to", event.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os Dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
