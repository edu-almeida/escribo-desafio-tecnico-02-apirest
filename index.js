const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/auth-api', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ mensagem: 'Endpoint não encontrado' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        req.user = jwt.verify(token, 'secretpassword');
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido' });
    }
};

// Rota para buscar usuário
app.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

