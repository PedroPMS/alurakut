import React from "react";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBox } from "../src/components/ProfileRelations";

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
  const [comunidades, setComunidades] = React.useState([]);

  const gihubUser = "PedroPMS";
  const amigos = [
    {
      id: "juunegreiros",
      title: "juunegreiros",
      imageUrl: "https://github.com/juunegreiros.png",
    },
    {
      id: "omariosouto",
      title: "omariosouto",
      imageUrl: "https://github.com/omariosouto.png",
    },
    { id: "peas", title: "peas", imageUrl: "https://github.com/peas.png" },
    {
      id: "rafaballerini",
      title: "rafaballerini",
      imageUrl: "https://github.com/rafaballerini.png",
    },
    {
      id: "marcobrunodev",
      title: "marcobrunodev",
      imageUrl: "https://github.com/marcobrunodev.png",
    },
    {
      id: "felipefialho",
      title: "felipefialho",
      imageUrl: "https://github.com/felipefialho.png",
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

    fetch("/api/comunidades/getAll")
      .then((response) => response.json())
      .then((resposta) => {
        const comunidadesDato = resposta.data;
        setComunidades(comunidadesDato);
      });
  }, []);

  const seguidoresFormatados = seguidores.map((seguidor) => {
    return {
      id: seguidor.login,
      title: seguidor.login,
      imageUrl: seguidor.avatar_url,
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
              onSubmit={async (event) => {
                event.preventDefault();

                const dadosForm = new FormData(event.target);

                const novaComunidade = {
                  title: dadosForm.get("title"),
                  imageUrl: dadosForm.get("image"),
                  creatorSlug: "PedroPMS",
                };

                const resposta = await fetch("api/comunidades/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(novaComunidade),
                });
                const novaComunidadeJson = await resposta.json();

                setComunidades([...comunidades, novaComunidadeJson.comunidade]);
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
