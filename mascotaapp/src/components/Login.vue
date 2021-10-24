<template>
  <div class="quiero">
<form name='registration'>
<ul>
<li><label for="userid">Nombre y Apellido:</label></li>

<li><input type="text" name="userid" size="12"/></li><br>
<li><label for="passid">Contraseña [8 to 12 caracteres] :</label></li>
<li><input type="password" name="passid" size="12" /></li><br>
<li><label for="email">Email [Valid email] :</label></li>
<li><input type="text" name="email" size="50"  /></li><br>
<li><label for="address">Direccion :</label></li>
<li><input type="text" name="address" size="30" /></li><br>
<li><label for="country">Nacionalidad [Seleccionar el pais] :</label></li>
<li><select name="country">
<option selected="" value="Default">(Seleccionar)</option>
<option value="AR">Argentina</option>
<option value="UY">Uruguay</option>
<option value="BR">Brasil</option>
<option value="AF">Australia</option>
<option value="AL">Canada</option>
<option value="AD">USA</option>
</select></li><br>
<li><label id="gender">Genero:</label></li>
<li><input type="radio" name="sex" value="Male" checked /><span>Male</span></li>
<li><input type="radio" name="sex" value="Female" /><span>Female</span></li>
<br>
<li><label for="LivingPlace">Tipo de Vivienda [Seleccionar ] :</label></li>
<li><select name="LivingPlace">
<option selected="" value="Default">(Seleccionar)</option>
<option value="CA">Casa</option>
<option value="DP">Departamento</option>
<option value="CT">Country</option>
<option value="PH">PH</option>
</select></li>
<br>
<li><label for="desc">Comentarios [Opcional] :</label></li>
<li><textarea name="desc" id="desc"></textarea></li>
<br>
<li><input type="submit" name="submit" value="Guardar" onclick="alert('Form submitted successfully')" /></li>
</ul>
</form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
   data() {
      return {
        mainProps: { blank: true, blankColor: '#777',  width: 175, height: 175, class: 'm1'}
      }
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #A3E3DC;
}





</style>