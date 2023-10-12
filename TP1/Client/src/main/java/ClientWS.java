import proxy.BanqueService;
import proxy.BanqueWS;
import proxy.Compte;

public class ClientWS {
    public static void main(String[] args) {
        BanqueService stub = new BanqueWS().getBanqueServicePort();
        System.out.println(stub.conversionMTN(800));

        Compte cp = stub.getCompte(1);
        System.out.println(cp.getCode());
        System.out.println(cp.getSolde());
    }
}
