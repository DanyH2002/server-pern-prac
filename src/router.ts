import { Router } from 'express';
import { request, response } from 'express';

const router = Router();
router.get('/', (req, res) => {
    res.send("Hola, somos power rangers");
});
router.post('/', (req, res) => {
    res.send("Que el poder te acompañe");
}); 
router.put('/', (req, res) => {
    res.send("El mejor power ranger es Tommy Oliver");
});
router.delete('/', (req, res) => {
    res.send("El mejor villano es Lord Drakkon");
});

export default router;
