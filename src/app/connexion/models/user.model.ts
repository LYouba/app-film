export class User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;

  constructor(
    nom: string,
    prenom: string,
    email: string,
    password: string,
    id?: number,
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
  }
}
