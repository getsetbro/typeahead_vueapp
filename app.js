const api = 'http://jsonplaceholder.typicode.com';

let vm = new Vue({
  el: '#app',
  data: {
    term: '',
    term_paging:'',
    suggestions:[],
    noSuggestions:false,
    list:[],
  },

  methods: {
    filt:function(arr) {
      if(!vm.term){return [];}
      return arr.filter(function(o) {
        return o.name.toLocaleLowerCase().search(vm.term.trim().toLocaleLowerCase()) >= 0;
      });
    },
    debo: _.debounce(function (e) {
      axios.get(api + '/users')
      .then(function (ret) {
        vm.suggestions = vm.filt(ret.data);

      })
      .catch(function (err) {vm.suggestions = [];});
    }, 400),

    onSubmit:function(params) {
      vm.term_current = vm.term;
      axios.get(api + '/users')
      .then(function (ret) {
        vm.list = vm.filt(ret.data);
        vm.term = '';
        vm.suggestions = [];
      })
      .catch(function (err) {vm.list = [];});

    }
  }
})