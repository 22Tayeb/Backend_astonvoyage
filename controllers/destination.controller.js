import Destination from "../models/destination.model.js";
import Vols from "../models/vols.model.js";
import File from "./../models/file.model.js";

// function create destination
export const createDest = async (req, res) => {

    const destination = { ...req.body, date_depart: new Date(req.body.date_depart), date_retour: new Date(req.body.date_retour) }
    console.log(typeof destination.date_depart);
    const vols = new Vols(req.body.vols);
    const dest = new Destination(destination)
    //save destination
    try {
        const responseVols = await vols.save()
        console.log(responseVols);
        dest.vols = responseVols._id;
        const response = await dest.save()
        res.status(201).json({ response })
    } catch (err) {
        res.status(500).json({ erreur: "création de destination impossible", err })
    }
}

export const getDest = async (req, res) => {
    const id = req.params.id
    const destination = await Destination.findById(id).populate('vols').exec();
    res.status(200).json(destination);
}

export const getAllDest = async (req, res) => {
    const allDest = await Destination.find({}).populate('vols');
    res.status(200).json(allDest)
}

export const updateDest = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const vols = new Vols(req.body.vols);

        const responseVols = await Vols.findByIdAndUpdate(vols._id, vols);

        const response = await Destination.findByIdAndUpdate(id, body);

        console.log(body)
        res.status(200).json({ response: 'Mise a jour effectué!' })
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de l'update de la destination", error })
    }
}

export const deleteDest = async (req, res) => {
    try {
        const id = req.params.id

        const destination = await Destination.findByIdAndRemove(id)
        const image = await File.findOneAndDelete({ filename: destination.file })
        console.log(image)
        res.status(200).json({ succes: "la déstination avec l'id ->" + destination.id + " a bien été supprimé!!!" })
    } catch (error) {
        res.status(500).send(error);
    }

}
export const getAllDestByDate = async (req, res) => {
    const date_depart = new Date(req.query.dateDepart)
    try {
        const destinations = await Destination.find({ date_depart: { $gte: date_depart } });
        res.status(200).json({ succes: "date validé", res: destinations })
    } catch (error) {
        res.status(500).send(error)
    }
}


