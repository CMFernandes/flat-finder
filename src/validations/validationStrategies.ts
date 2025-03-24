import  {minLengthValidation } from "./minLengthValidation"
import { emailValidation } from "./emailValidation";
import { passwordValidation } from "./passwordValidation";
import { confirmPasswordValidation } from "./confirmPasswordValidation";
import { ageValidation } from "./ageValidation";
import { requiredValidation } from "./requiredValidation";

import { positiveNumberValidation } from "./positiveNumberValidation";


export const validationStrategies = {
    firstName: [requiredValidation,minLengthValidation],
    lastName: [requiredValidation,minLengthValidation],
    email: [requiredValidation, emailValidation], 
    password: [requiredValidation,passwordValidation],
    confirmPassword: [confirmPasswordValidation], 
    birthDate: [requiredValidation,ageValidation],

    city: [requiredValidation, minLengthValidation],
    streetName: [requiredValidation, minLengthValidation],
    streetNumber: [requiredValidation, positiveNumberValidation],
    areaSize: [requiredValidation, positiveNumberValidation ],
    yearBuilt: [requiredValidation, positiveNumberValidation ],
    rentPrice: [requiredValidation, positiveNumberValidation ],
    dateAvailable: [requiredValidation],

    imgUrl: [requiredValidation],

    content: [requiredValidation]
};