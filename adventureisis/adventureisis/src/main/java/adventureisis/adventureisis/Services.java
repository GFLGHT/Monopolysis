/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package adventureisis.adventureisis;

import generated.World;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

/**
 *
 * @author jbouysso
 */
public class Services {
    private World world = new World();
    
    public World readWorldFromXml()
    {
        JAXBContext jaxbContext;
        InputStream input = getClass().getClassLoader().getResourceAsStream("world.xml");
         try {
            jaxbContext = JAXBContext.newInstance(World.class);
            System.out.println("lecture ");
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            world = (World) jaxbUnmarshaller.unmarshal(input);
        } catch (JAXBException ex) {
            System.out.println("Erreur lecture du fichier:"+ex.getMessage());
            ex.printStackTrace();
        }
        return world;
    }
    
    public void saveWorldToXml(World world)
    {
        JAXBContext jaxbContext;
        try {
            OutputStream output = new FileOutputStream("world.xml");
            jaxbContext = JAXBContext.newInstance(World.class);
            Marshaller march = jaxbContext.createMarshaller();
            march.marshal(world, output);
        } catch (Exception ex) {
            System.out.println("Erreur écriture du fichier:"+ex.getMessage());
            ex.printStackTrace();
        }     
    }
    
    public World getWorld() {
        this.world = readWorldFromXml();
        return world;
    }
}
