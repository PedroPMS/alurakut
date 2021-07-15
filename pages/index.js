import React from "react";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

const ProfileSideBar = (props) => {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="profile"
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

export default function Home() {
  const comunidadePadrao = {
    id: new Date().toISOString,
    title: "Eu odeio acordar cedo",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
  };
  const [comunidades, setComunidades] = React.useState([comunidadePadrao]);

  const gihubUser = "PedroPMS";
  const amigos = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  return (
    <>
      <AlurakutMenu githubUser={gihubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={gihubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();

                const dadosForm = new FormData(event.target);

                const novaComunidade = {
                  id: new Date().toISOString,
                  title: dadosForm.get("title"),
                  image: dadosForm.get("image"),
                };

                setComunidades([...comunidades, novaComunidade]);
              }}
            >
              <div>
                <input
                  placeholder="Qual o nome da sua comunidade?"
                  name="title"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  type="text"
                />
              </div>

              <button>Criar comunnidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Amigos ({amigos.length})</h2>
            <ul>
              {amigos.map((amigo) => (
                <li key={amigo}>
                  <a href={`/users/${amigo}`} key={amigo}>
                    <img src={`https://github.com/${amigo}.png`} />
                    <span>{amigo}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((comunidade) => (
                <li key={comunidade.id}>
                  <a
                    href={`/comunities/${comunidade.title}`}
                    key={comunidade.title}
                  >
                    <img src={comunidade.image} />
                    <span>{comunidade.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
