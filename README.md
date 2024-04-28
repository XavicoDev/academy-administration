# Proyecto de administración de academia

Este repositorio contiene una aplicación desarrollada con Angular 17 que consume servicios (APIs) de Laravel 11 para la gestión de cursos, estudiantes y la asignación entre estos. La aplicación cumple con los siguientes requisitos:

## Entidades y campos

### Administrador

-   Nombre: Obligatorio, longitud máxima de 100 caracteres.
-   Apellido: Obligatorio, longitud máxima de 100 caracteres.
-   Correo electrónico: Obligatorio, único, formato de email.
-   Contraseña: Mínimo 8 caracteres, al menos un número, una letra mayúscula y un carácter especial.

### Estudiante

-   Nombre: Obligatorio, longitud máxima de 100 caracteres.
-   Apellido: Opcional, longitud máxima de 100 caracteres.
-   Edad: Obligatorio, no puede ser menor de 18 años.
-   Cédula: Obligatorio, longitud máxima de 11 caracteres, tipo string.
-   Correo electrónico: Obligatorio, único, formato de email.

### Cursos

-   Nombre: Obligatorio, longitud máxima de 50 caracteres.
-   Descripción de horario: Se acepta cualquier solución.
-   Fecha inicio: Obligatorio, tipo fecha.
-   Fecha fin: Obligatorio, tipo fecha.
-   Tipo: Obligatorio, opciones: Presencial o Virtual.

## Ejemplo de uso

![1_iniciar_sesion](images/1_iniciar_sesion.png)
![2_tablero_de_estadisticas](images/2_tablero_de_estadisticas.png)
![3_lista_de_estudiantes](images/3_lista_de_estudiantes.png)
![4_registo_exitoso_de_nuevo_estudiante](images/4_registo_exitoso_de_nuevo_estudiante.png)
![5_editar_estudiante](images/5_editar_estudiante.png)
![6_consultar_cursos_matriculados_por_estudiante](images/6_consultar_cursos_matriculados_por_estudiante.png)
![7_lista_de_cursos](images/7_lista_de_cursos.png)
![8_registrar_nuevo_curso](images/8_registrar_nuevo_curso.png)
![9_editar_curso](images/9_editar_curso.png)
![10_eliminar_curso](images/10_eliminar_curso.png)
![11_administrar_matriculas](images/11_administrar_matriculas.png)
![12_asignacion_de_matriculas](images/12_asignacion_de_matriculas.png)





