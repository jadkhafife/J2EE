import jakarta.xml.ws.Endpoint;
import ws.BanqueService;

public class ServerJWS {
    public static void main(String[] args) {
        Endpoint.publish("http://0.0.0.0:7171/banqueWS", new BanqueService());
        System.out.println("Server is running on http://0.0.0.0:7171/");
    }
}
