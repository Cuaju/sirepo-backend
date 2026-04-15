import {loginWithUsernamePassword, loginWithAccessToken} from '../services/authentication.service.js';
import {validateLoginBody, validateTokenLoginBody} from '../utils/validator.js';

export async function login(req, res, next) {
  try {
    const validationError = validateLoginBody(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    const { username, password } = req.body;
    const result = await loginWithUsernamePassword(username, password);
    //FALTA IMPLEMENTAR EL LOG DE INICIO DE SESION ASI COMO EL LOG DE FALLO DE CONTRASEÑA
    return res.status(200).json(result);
  } catch (error) {
    next(error);

    // Sigue faltando igualmente la implementacion de login institucional
    // por ahora solo es login mediante base de datos
  }
}

export async function loginByToken(req, res, next) {
  try {
    const validationError = validateTokenLoginBody(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    const { accessToken } = req.body;
    const result = await loginWithAccessToken(accessToken);
    //CONTINUARA LA IMPLEMENTACION DE ESTE ENDPOINT CUANDO SE AVANCEN CON LOS DEMAS SERVICIOS
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}