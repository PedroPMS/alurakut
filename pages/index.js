import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

const ProfileSideBar = (props) => {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="profile"
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
};

export default function Home() {
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
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={gihubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
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
                <li>
                  <a href={`/users/${amigo}`} key={amigo}>
                    <img src={`https://github.com/${amigo}.png`} />
                    <span>{amigo}</span>
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
