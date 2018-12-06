const changetime={
    changeDate(times) {
        var date=new Date(times).getFullYear()+'-'+(new Date(times).getMonth()+1)+'-'+new Date(times).getDate();
        return date;
    }
}

export default class Time{
    static install(Vue){
        Object.defineProperty(Vue.prototype,'$changTime',{
            get(){return changetime}
        })
    }
}