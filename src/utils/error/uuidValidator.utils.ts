import { validate } from 'uuid';
import { HttpError } from './httpError.utils';

export const uuidValidator = (typeData: string, uuid: string) => {
    if (!validate(uuid)) {
        throw new HttpError(`${typeData} not found by id ${uuid}`, 404);
    }
};
