export default function Cadastro_usuario() {
  return (
    <form>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="inputEmail4">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            placeholder="Email"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="inputPassword4">Senha</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            placeholder="Senha"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress">Endereço</label>
        <input
          type="text"
          class="form-control"
          id="inputAddress"
          placeholder="Rua dos Bobos, nº 0"
        />
      </div>
      <div class="form-group">
        <label for="inputAddress2">Endereço 2</label>
        <input
          type="text"
          class="form-control"
          id="inputAddress2"
          placeholder="Apartamento, hotel, casa, etc."
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">Cidade</label>
          <input type="text" class="form-control" id="inputCity" />
        </div>
        <div class="form-group col-md-4">
          <label for="inputEstado">Estado</label>
          <select id="inputEstado" class="form-control">
            <option selected>Escolher...</option>
            <option>...</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="inputCEP">CEP</label>
          <input type="text" class="form-control" id="inputCEP" />
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck" />
          <label class="form-check-label" for="gridCheck">
            Clique em mim
          </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        Entrar
      </button>
    </form>
    /*  <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-7">
            <div className="card-header text-center mb-4">
              <h2>Cadastro de usuário</h2>
            </div>
            <div className="card-body">
              <form onSubmit="">
                  <input
                    type="text"
                    placeholder="Digite seu login"
                    value=""
                    onChange=""
                    className="form-control m-3"
                    id="usuario"
                    name="usuario"
                  />
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value=""
                    onChange=""
                    className="form-control m-3"
                    id="senha"
                    name="senha"
                  />
                <button type="submit" className="btn btn-primary w-100 m-3">
                  Login
                </button>
              </form>
            </div>
        </div>
      </div> */
  );
}
