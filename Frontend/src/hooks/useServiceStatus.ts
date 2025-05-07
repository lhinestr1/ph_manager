import { useState } from 'react'
import { Service } from '../types/Service';

export const useServiceStatus = (initStatus: Service): [Service, (status :Service) => void] => {
    const [serviceStatus, setServiceStatus] = useState<Service>(initStatus);

    const handlerSetServiceStatus= (statusParams: Service): void => {
        setServiceStatus(statusParams);
        //error autoChange in 3000ms
        if(statusParams.status === 'error'){
            setTimeout(() => {
                setServiceStatus({
                    status: 'init'
                })
            }, 3000);
        }
    }

    return [serviceStatus, handlerSetServiceStatus]
}
