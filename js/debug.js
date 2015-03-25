// JScript File

function join(o)
{
    var a = [];
    
    for(var p in o)
        switch(typeof(o[p]))
        {
            
            case "string" :
               a.push(p + ": " + o[p] + "\n");
               break;
            case "object" :
                a.push("" + p + ":" + o[p] + "\n");
                break;
        }
    return a.join('');
}