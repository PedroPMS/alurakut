import React from "react";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import {
  ProfileRelationsBoxWrapper,
  ProfileRelationsBox,
} from "../src/components/ProfileRelations";

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
    {
      id: "juunegreiros",
      title: "juunegreiros",
      image: "https://github.com/juunegreiros.png",
    },
    {
      id: "omariosouto",
      title: "omariosouto",
      image: "https://github.com/omariosouto.png",
    },
    { id: "peas", title: "peas", image: "https://github.com/peas.png" },
    {
      id: "rafaballerini",
      title: "rafaballerini",
      image: "https://github.com/rafaballerini.png",
    },
    {
      id: "marcobrunodev",
      title: "marcobrunodev",
      image: "https://github.com/marcobrunodev.png",
    },
    {
      id: "felipefialho",
      title: "felipefialho",
      image: "https://github.com/felipefialho.png",
    },
  ];

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.github.com/users/PedroPMS/followers")
      .then((response) => {
        return response.json();
      })
      .then((resposta) => {
        setSeguidores(resposta);
      });
  }, []);

  const seguidoresFormatados = seguidores.map((seguidor) => {
    return {
      id: seguidor.login,
      title: seguidor.login,
      image: seguidor.avatar_url,
    };
  });

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

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title={"Amigos"} items={amigos} />

          <ProfileRelationsBox title={"Comunidades"} items={comunidades} />

          <ProfileRelationsBox
            title={"Seguidores"}
            items={seguidoresFormatados}
          />
        </div>
      </MainGrid>
    </>
  );
}
