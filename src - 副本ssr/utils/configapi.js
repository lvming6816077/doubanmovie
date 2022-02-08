
const mock = {
  nowmovie:'/json/nowmovie.json',
  recentmovie:'/json/recentmovie.json',
  toprank:'/json/toprank.json',
  detail:()=>'/json/detail/detail.json',
  rate:()=>'/json/detail/rate.json',
  actors:()=>'/json/detail/actors.json',
  comments:()=>'/json/detail/comments.json',
  search:'/json/search.json'
}
const online = {
  nowmovie:'/api/v2/subject_collection/movie_showing/items',
  recentmovie:'/api/v2/subject_collection/movie_hot_gaia/items',
  toprank:'/api/v2/subject_collection/movie_weekly_best/items',
  detail:(id)=>'/api/v2/movie/'+id,
  rate:(id)=>'/api/v2/movie/'+id+'/rating',
  actors:(id)=>'/api/v2/movie/'+id+'/celebrities',
  comments:(id)=>'/api/v2/movie/'+id+'/reviews',
  search:'/api/v2/search/weixin'
  
}

// 不要忘记export
export default mock