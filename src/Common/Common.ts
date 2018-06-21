export class Common{
    //key名に対応したgetパラメーターを取得する
    public static getParameter = (key:string) => {
        var str = location.search.split("?");
        if (str.length < 2) {
            return "";
        }
        var params = str[1].split("&");
        for (var i = 0; i < params.length; i++) {
        var keyVal = params[i].split("=");
            if (keyVal[0] == key && keyVal.length == 2) {
                return decodeURIComponent(keyVal[1]);
            }
        }
        return "";
    }
}