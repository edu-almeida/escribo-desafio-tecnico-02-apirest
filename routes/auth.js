const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { nome, email, senha, telefones } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ mensagem: 'E-mail já existente' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = new User({
            nome,
            email,
            senha: hashedPassword,
            telefones,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, 'secretpassword', { expiresIn: '1h' });

        res.json({
            id: savedUser._id,
            data_criacao: savedUser.data_criacao,
            data_atualizacao: savedUser.data_atualizacao,
            ultimo_login: savedUser.ultimo_login,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, senha } = req.body;


        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
        }

        user.ultimo_login = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id }, 'secretpassword', { expiresIn: '1h' });

        res.json({
            id: user._id,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

module.exports = router;
