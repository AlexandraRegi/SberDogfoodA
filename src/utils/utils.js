export  const getEndings = (numb, field = 'товар') => {
    numb %= 100;
        if (numb >= 5 && numb <= 20) {
            return ` ${field}ов`;
        }
        numb %= 10;
        if (numb === 1) {
            return ` ${field}`;
        }
        if (numb > 1 && numb < 5) {
            return ` ${field}а`;
        }
        return ` ${field}ов`;
}