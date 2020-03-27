const volumeOfRectangularPrism = function (length, height, width)
{
    if((typeof length == "number" && length > 0) && (typeof height == "number" && height > 0) && (typeof width == "number" && width > 0)){
        return (length * height * width)
    }else{
        return ("enter a valid number");
         }
}

const surfaceAreaOfRectangularPrism = function (length, height, width) {
    if (typeof length == "number" && length > 0 ) {
        if (typeof height == "number" && height > 0) {
            if (typeof width == "number" && width > 0) {
                let wl = 2 * width * length;
                let wh = 2 * width * height;
                let hl = 2 * height * length;
                return (wl + wh + hl)
            } else {
                return ("enter a valid number");
            }
        } else {
            return ("enter a valid number");
        }
    } else {
        return ("enter a valid number");
    }
}

const volumeOfSphere = function (radius) {
    if (typeof radius == "number" && radius > 0) {
        return ( (4/3) * Math.PI * Math.pow(radius, 3))
    } else {
        return ("enter a valid radius");
    }
}

const surfaceAreaOfSphere = function (radius) {
    if (typeof radius == "number" && radius > 0) {
        return ( 4 * Math.PI * ( radius * radius))
    } else {
        return ("enter a valid radius");
           }
}


module.exports = {
    volumeOfRectangularPrism,
    surfaceAreaOfRectangularPrism,
    volumeOfSphere,
    surfaceAreaOfSphere
}