import React from "react";
import Secao1 from "../../../assets/imgs/bg_1.png";
import MulherDuvida from "../../../assets/imgs/mulherComDuvida.png";
import Notas from "../../../assets/imgs/notas.png";
import Pessoas from "../../../assets/imgs/pessoas.png";
import Sorteio from "../../../assets/imgs/sorteio.png";
import Mulher from "../../../assets/imgs/mulher-quadrada.jpg";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Secao1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "55vh",
            display: "flex",
            alignItems: "center",
            pb: 4,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 2 : "50px",
            }}
          >
            <Typography variant="h4" sx={{ width: isMobile ? "100%" : "40%" }}>
              Participe da <span style={{ color: "#FECC2D" }}>Nota Premiada do Acre</span> e Ganhe Prêmios Incríveis!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                pb: 2,
                width: isMobile ? "100%" : "40%",
                textAlign: "justify",
              }}
            >
              Descubra como a <span style={{ color: "#FECC2D" }}>Nota Premiada</span> pode transformar suas compras em
              chances de ganhar prêmios incríveis! <span style={{ color: "#FECC2D" }}>Cadastre-se</span> agora e concorra
              a <span style={{ color: "#FECC2D" }}>prêmios em dinheiro.</span> Não perca essa oportunidade de ser
              recompensado por suas compras!
            </Typography>
          </Container>
        </Box>
      </Box>
      {/* Seção 2 */}
      <Box position={"relative"} pt={"3.5em"}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "#fff",
            width: isMobile ? "20em" : "35%",
            height: "3.5em",
          }}
        ></Box>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            sx={{ position: "absolute", top: "2.8em", color: "#fff" }}
          >
            O que é o programa?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                flexDirection: "column",
                color: "#7B7B7B",
              }}
            >
              <Typography
                sx={{ textAlign: "justify", py: "30px", fontSize: "1.1em" }}
              >
                A Nota Premiada Acreana é uma iniciativa do Governo do Estado do
                Acre para promover a conscientização sobre a importância da
                emissão de documentos fiscais. Ao se cadastrar no programa e
                informar seu CPF em compras, você ajuda o desenvolvimento do
                estado e concorre a prêmios em dinheiro, incluindo sorteios
                mensais e um especial anual em cinco regiões diferentes.
              </Typography>
              <Typography sx={{ textAlign: "justify", fontSize: "1.1em" }}>
                Além disso, você pode escolher uma entidade social para apoiar,
                e se você for sorteado, a instituição receberá 50% do valor da
                sua premiação. As entidades também recebem rateios mensais com
                base no engajamento social, incentivando a participação cidadã.
                Participe e contribua para o desenvolvimento do Acre enquanto
                concorre a prêmios em dinheiro!
              </Typography>
            </Box>
            <Box
              sx={{
                width: isMobile ? "100%" : "70%",
                display: "flex",
                justifyContent: isMobile ? "center" : "end",
              }}
            >
              <img src={MulherDuvida} width={isMobile ? 300 : 500} />
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Seção 3 */}
      <Box bgcolor={"primary.main"} color={"#fff"} py={"3.5em"}>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: isMobile ? "20em" : "33%",
            height: "3.5em",
            marginLeft: "auto",
          }}
        ></Box>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "-1.8em",
              right: "20px",
              color: "primary.main",
            }}
          >
            Como funciona?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              gap: 3,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                justifyContent: isMobile ? "center" : "start",
                paddingTop: "30px",
              }}
            >
              <img src={Notas} width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}/>
            </Box>

            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ textAlign: "justify", py: "30px", fontSize: "1.1em" }}
              >
                Os sorteios mensais e o sorteio anual especial serão realizados
                com base na Loteria Federal, acontecendo no mês subsequente ao
                período de apuração dos bilhetes. Bilhetes eletrônicos emitidos
                de acordo com a Portaria nº XXX/2023 são válidos apenas para o
                sorteio correspondente e não podem ser usados em sorteios
                subsequentes. As regiões geográficas participantes incluem Baixo
                Acre, Alto Acre, Juruá, Tarauacá-Envira e Purus, conforme o
                Decreto nº XXX de 17 de XXXXXXXXX de 2023.
              </Typography>
              <Typography sx={{ textAlign: "justify", fontSize: "1.1em" }}>
                Os pontos, gerados com base em notas fiscais transmitidas e
                autorizadas, serão usados para emitir bilhetes de sorteio e
                calcular o rateio para as entidades sociais. Cada pessoa física
                pode receber até 50 bilhetes por sorteio mensal e até 600
                bilhetes por sorteio anual especial, por região. Os pontos
                gerados com documentos fiscais têm um limite de R$ 500,00
                (quinhentos reais) por mês, correspondendo a 500 pontos, e não
                podem ser acumulados para premiações em meses seguintes.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Seção 4 */}
      <Box position={"relative"} py={"3.5em"}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "#fff",
            width: isMobile ? "20em" : "35%",
            height: "3.5em",
          }}
        ></Box>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            sx={{ position: "absolute", top: "2.8em", color: "#fff" }}
          >
            Quem pode participar?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                flexDirection: "column",
                color: "#7B7B7B",
              }}
            >
              <Typography
                sx={{ textAlign: "justify", py: "30px", fontSize: "1.1em" }}
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
                molestias rerum reiciendis eum quibusdam architecto, maiores
                perferendis est, quaerat illum sapiente rem ab, suscipit beatae
                officiis aliquid ipsam debitis aspernatur?
              </Typography>
              <Typography sx={{ textAlign: "justify", fontSize: "1.1em" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
                molestias rerum reiciendis eum quibusdam architecto, maiores
                perferendis est, quaerat illum sapiente rem ab, suscipit beatae
                officiis aliquid ipsam debitis aspernatur?
              </Typography>
            </Box>
            <Box
              sx={{
                width: isMobile ? "100%" : "70%",
                display: "flex",
                justifyContent: isMobile ? "center" : "end",
              }}
            >
              <img src={Pessoas} width={isMobile ? 300 : 500} />
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Seção 5 */}
      <Box bgcolor={"primary.main"} color={"#fff"} py={"3.5em"}>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: isMobile ? "22em" : "40%",
            height: "3.5em",
            marginLeft: "auto",
          }}
        ></Box>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "-1.8em",
              right: "20px",
              color: "primary.main",
            }}
          >
            Como funcionam os sorteios?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              gap: 3,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                justifyContent: isMobile ? "center" : "start",
                paddingTop: "30px",
              }}
            >
              <img src={Sorteio} width={isMobile ? 300 : 400} />
            </Box>

            <Box
              sx={{
                width: isMobile ? "100%" : "40%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ textAlign: "justify", py: "30px", fontSize: "1.1em" }}
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
                molestias rerum reiciendis eum quibusdam architecto, maiores
                perferendis est, quaerat illum sapiente rem ab, suscipit beatae
                officiis aliquid ipsam debitis aspernatur?
              </Typography>
              <Typography sx={{ textAlign: "justify", fontSize: "1.1em" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
                molestias rerum reiciendis eum quibusdam architecto, maiores
                perferendis est, quaerat illum sapiente rem ab, suscipit beatae
                officiis aliquid ipsam debitis aspernatur?
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Seção 6 */}
      <Box py={"3.5em"}>
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{ color: "primary.main", fontWeight: "bold", mb: 4 }}
        >
          Notícias
        </Typography>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Card
            sx={{
              backgroundColor: "#E2E2E2",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              padding: 2,
            }}
          >
            <CardMedia sx={{ maxWidth: isMobile ? "100%" : "18%" }}>
              <img src={Mulher} width={"100%"} />
            </CardMedia>
            <Box
              sx={{
                color: "#7b7b7b",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "1.2em", textAlign: "justify", mb: 2 }}
                >
                  Ganhador do Prêmio Nota Premiada, Sr. Cat, conta como se sente
                  e o que fará com todo o dinheiro.
                </Typography>
                <Typography sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the
                </Typography>
              </Box>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ler mais
              </Link>
            </Box>
          </Card>
          <Card
            sx={{
              backgroundColor: "#E2E2E2",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              padding: 2,
            }}
          >
            <CardMedia sx={{ maxWidth: isMobile ? "100%" : "18%" }}>
              <img src={Mulher} width={"100%"} />
            </CardMedia>
            <Box
              sx={{
                color: "#7b7b7b",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "1.2em", textAlign: "justify", mb: 2 }}
                >
                  Ganhador do Prêmio Nota Premiada, Sr. Cat, conta como se sente
                  e o que fará com todo o dinheiro.
                </Typography>
                <Typography sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the
                </Typography>
              </Box>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ler mais
              </Link>
            </Box>
          </Card>
          <Card
            sx={{
              backgroundColor: "#E2E2E2",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              padding: 2,
            }}
          >
            <CardMedia sx={{ maxWidth: isMobile ? "100%" : "18%" }}>
              <img src={Mulher} width={"100%"} />
            </CardMedia>
            <Box
              sx={{
                color: "#7b7b7b",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "1.2em", textAlign: "justify", mb: 2 }}
                >
                  Ganhador do Prêmio Nota Premiada, Sr. Cat, conta como se sente
                  e o que fará com todo o dinheiro.
                </Typography>
                <Typography sx={{ textAlign: "justify" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the
                </Typography>
              </Box>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ler mais
              </Link>
            </Box>
          </Card>
        </Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" sx={{ py: "10px", px: "20px" }}>
            Todas as Notícias
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
