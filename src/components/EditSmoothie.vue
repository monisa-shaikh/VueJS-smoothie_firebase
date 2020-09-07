<template>
   <div class="container edit-smoothie" v-if="smoothie">
       <!-- <h2>edit smoothie {{ this.$route.params.smoothie_slug }}</h2> -->
         <h2>edit  {{ smoothie.title }}</h2>
              <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
          
            <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">ingredients</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Upadte</button>
            </div>
        </form>
       </div> 
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name:'EditSmoothie',
    data(){
        return{
            smoothie:null,
            another:null,
            feedback:null
        }
    },
    methods:{
        EditSmoothie(){
            // console.log(this.smoothie.title, this.smoothie.ingredients);
             if(this.smoothie.title){
                this.feedback=null
                //create a slug
                this.smoothie.slug=slugify(this.smoothie.title,{
                    replacement:'-',
                    remove:/[$*_+~.()`"\!-:@]/g,
                    lower:true
                })
                // console.log(this.slug)
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title:this.smoothie.title,
                    ingredients:this.smoothie.ingredients,
                    slug:this.smoothie.slug
                }).then(()=>{
                    this.$router.push({ name :'Index'})
                }).catch(err=>{
                    console.log(err)
                })
            }
            else{
                this.feedback='You Must Enter a Smoothies title'
            }
        },
         addIng(){ 
            if(this.another){
                 this.smoothie.ingredients.push(this.another)
                 console.log(this.smoothie.ingredients)
                 this.another=null
                 this.feedback=null
            }
            else{
                this.feedback='You Must enter av alue to add an ingredient'
            }
           
        },
        deleteIng(ing){
            this.smoothie.ingredients=this.smoothie.ingredients.filter(ingredient=>{
                return ingredient != ing
            })
        }
    }
    ,
    created(){
        let ref=db.collection('smoothies').where('slug','==',this.$route.params.smoothie_slug)
        ref.get().then(snapshort=>{
            snapshort.forEach(doc => {
                // console.log(doc.data())
                this.smoothie=doc.data()
                this.smoothie.id=doc.id
            });
        })
    }
}
</script>
<style >
.edit-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}
</style>