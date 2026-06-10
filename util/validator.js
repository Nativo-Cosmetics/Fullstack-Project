import validator from 'validator'

// **********
// * USER VALIDATION *
// **********

/*
@params
(from User Schema) u: {
    email: string,
    password: string,
    name: string,
    lastName: string
}

*/

export const validateUser = (u) => {
    console.log('Validating user:', u);

    const checkEmail = !validator.isEmpty(u.email) &&
                        validator.isEmail(u.email) &&
                        validator.isLength(u.email, { min: 5 });

    const checkPass = !validator.isEmpty(u.password) &&
                       validator.isLength(u.password, {min: 8, max: 12});

    const checkName = !validator.isEmpty(u.name) &&
                      validator.isLength(u.name, { min: 2 });
    
    const checklastName = !validator.isEmpty(u.lastName) && 
                           validator.isLength(u.lastName, { min: 2});

    // throw error if any validation fails
    if (!checkEmail || !checkPass) {
        if (!checkEmail) {
            throw new Error('Invalid email: must be a valid email address and at least 5 characters long.');
        }
        if (!checkPass) {
            throw new Error('Invalid password: must be between 8 and 12 characters long.');
        }
    }

    if (!checkName || !checklastName) {
        if (!checkName) {
            throw new Error('Invalid name: must be at least 2 characters long.');
        }
        if (!checklastName) {
            throw new Error('Invalid last name: must be at least 2 characters long.');
        }
    }
}


// **********
// * ITEM VALIDATION *
// **********

/*
@params
(from Item Schema) i: {
    name: string,
    desc: string,
    category: string,
    price: float,
    descuento: float,
    img: string
}

*/

export const checkItem = (params) => {
    let checkName = !validator.isEmpty(params.name) &&
                    validator.isLength(params.name, {min: 1})

    let checkCategory = !validator.isEmpty(params.category)

    let checkPrice = !validator.isEmpty(params.price) &&
                     validator.isLength(params.price, {min: 4})

    if (!checkName || !checkCategory || !checkPrice ) {
        throw new Error('Error al validar información, datos faltantes.')
    }
}

export const checkIdItem = (id) => {
    let checkId = !validator.isEmpty(id) && validator.isLength(id, { min: 24, max: 24 })

    if (!checkId) {
        throw new Error('Error al validar la ID del artículo.')
    }
}