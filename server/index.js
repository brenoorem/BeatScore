import "dotenv/config";
import express from "express";
import prisma from "./db.js";

const app = express();
app.use(express.json());

app.post("/albuns", async (req, res) => {
  try {
    const { nome, id_spotify } = req.body;

    const album = await prisma.album.create({
      data: {
        nome,
        id_spotify,
      },
    });

    res.status(201).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar álbum" });
  }
});

app.get("/albuns", async (req, res) => {
  const albuns = await prisma.album.findMany();
  res.json(albuns);
});

app.listen(3001, () => console.log("rodando"));