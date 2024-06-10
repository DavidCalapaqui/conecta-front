import { IApiResponse, ICarDto, ICirculation } from "./carDto.interface"
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2'
import { MyAlert } from "../utils/MyAlert";


export class CarService {


    static saveCar = async (car: ICarDto): Promise<void> => {
        try {
            const baseUrl = "http://localhost:8080/api/cars"
            const resp = await axios.post<IApiResponse<ICarDto>>(`${baseUrl}`, car, {
                timeout: 5 * 1000,
            });
            MyAlert.showSuccess({message:resp.data?.message! ?? "Vehículo registrado correctamente"})
        } catch (error) {
            this.handleError(error, 'Error al registrar vehículo')
        }
    }


    static getCirculation = async (carPlate: string, datetime: Date): Promise<void> => {
        try {
            console.log({ datetime });
            const url = `http://localhost:8080/api/cars/${carPlate}?dateTime=${datetime}`;
            const response = await axios.get<IApiResponse<ICirculation>>(url);
            const { data, message } = response.data;

            if (!data) {
                await MyAlert.showError(message)
                return;
            }
            const { canCirculate, carDto: { automaker, color, model, plate, vim } } = data;
            const options:Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            const circulationMessage = `El vehículo ${canCirculate ? 'puede' :  'no puede'} circular en ${datetime.toLocaleString('es-ES', options)}`
            const carInfoMessage = 
            `PLACA: ${plate}\n  
            MARCA: ${automaker}\n 
            MODELO: ${model}\n 
            COLOR: ${color}\n 
            N° CHASIS: ${vim}`

            if(canCirculate){
                MyAlert.showSuccess({
                    title: circulationMessage,
                    message: carInfoMessage,
                })
            }else{
                MyAlert.showWarning(
                    carInfoMessage,
                    {
                        title: circulationMessage
                    }
                )
            }
        } catch (error) {
            this.handleError(error, 'Error al consultar circulación')
        }
    }

    private static handleError(error: any, defaultMessage: string): IApiResponse<any> {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError<IApiResponse<null>> = error as AxiosError<IApiResponse<null>>;
            const message = axiosError.response?.data.message ?? defaultMessage;
            MyAlert.showError(message)
            return axiosError.response?.data ?? {
                data: null,
                httpStatus: 'INTERNAL_SERVER_ERROR',
                message: defaultMessage,
                ok: false
            }
        }
        return {
            ok: false,
            data: null,
            httpStatus: 'INTERNAL_SERVER_ERROR',
            message: 'Error en peticion'
        }
    }
}