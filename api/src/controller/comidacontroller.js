const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const comida = await prisma.comida.findMany();
        return res.json(comida);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao obter as comidas." });
    }
};

const create = async (req, res) => {
    const data = req.body;

    try {
        const comida = await prisma.comida.create({
            data: {
                nome: data.nome,
                preco: data.preco,
                imagemUrl: data.imagemUrl || null,
            }
        });
        return res.status(201).json(comida);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao cadastrar a comida." });
    }
};

const update = async (req, res) => {
    const data = req.body;

    try {
        const comida = await prisma.comida.update({
            where: { id: parseInt(data.id) },
            data: {
                nome: data.nome,
                preco: data.preco,
                imagemUrl: data.imagemUrl || null,
            }
        });
        return res.status(202).json(comida);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar a comida." });
    }
};

const del = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.comida.delete({
            where: { id: id }
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao excluir a comida." });
    }
};

module.exports = {
    read,
    create,
    update,
    del
};