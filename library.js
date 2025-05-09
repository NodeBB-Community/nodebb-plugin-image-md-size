function getSetString(match, src, width, height) {

    if (width === "" && height === "") {
        return match;
    }

    return `<img src="${src}" style="width:${width}px!important; height:${height}px!important;"`;
}

function getPercentString(match, src, percent) {
    return `<img src="${src}" style="width:${percent}%!important; height: auto!important;"`;
}

function getWidthString(match, src, width) {
    if (width === "") {
        return match;
    }

    return `<img src="${src}" style="width: ${width}px!important; height: auto!important;"`;
}

function replaceContent(data) {

    percentRegex = /<img src="([^@]*)@([0-9]+)%(25)?"/g;
    absoluteRegex = /<img src="([^@]*)@([0-9]*)x([0-9]*)"/g;
    multiplyRegex = /<img src="([^@]*)@([0-9]*\.?[0-9]*)"/g;
    var newData = data;

    newData = newData.replace(percentRegex, getPercentString);
    newData = newData.replace(multiplyRegex, getWidthString);
    newData = newData.replace(absoluteRegex, getSetString);

    return newData;
}

var ImageSizer = {

    sizeImages: function(data, callback) {

        if (data && data.postData && data.postData.content) {

            data.postData.content = replaceContent(data.postData.content);
        }


        callback(null, data);
    },

    sizeImagesInComposerPreview: function(data, callback) {

        if (data) {

            data = replaceContent(data);
        }

        callback(null, data);
    }
};

module.exports = ImageSizer;
