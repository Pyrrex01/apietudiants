const { AppError } = require("../middlewares/appError");

class EtudiantController {
    service: any;

    constructor(service: any) {
        this.service = service;
    }

    getAll = async (request: any, response: any) => {
        void request;

        response.status(200).json(await this.service.getAll());
    };

    getById = async (request: any, response: any) => response.status(200).json(await this.service.getById(this.id(request.params.id)));

    create = async (request: any, response: any) => response.status(201).json(await this.service.create(request.body));

    replace = async (request: any, response: any) => response.status(200).json(await this.service.replace(this.id(request.params.id), request.body));

    updatePartial = async (request: any, response: any) => response.status(200).json(await this.service.updatePartial(this.id(request.params.id), request.body));

    remove = async (request: any, response: any) => {
        await this.service.remove(this.id(request.params.id));

        response.status(204).send();
    };

    private id(value: string): number {
        const id = Number(value);

        if (!Number.isSafeInteger(id) || id <= 0) throw new AppError("id doit être un entier positif.", 400);

        return id;
    }
}

module.exports = { EtudiantController };

export {};
