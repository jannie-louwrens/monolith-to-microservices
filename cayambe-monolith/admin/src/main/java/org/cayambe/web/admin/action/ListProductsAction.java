/*
 * ListProductsAction.java
 *
 * Created on September 22, 2001, 1:31 AM
 */

package org.cayambe.web.admin.action;


/**
 *
 * @author  jon rose
 * @version 
 */

import java.io.IOException;
import java.util.Hashtable;
import java.util.Locale;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionError;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionServlet;
import org.apache.struts.util.MessageResources;
import org.cayambe.core.ProductVO;
import org.cayambe.util.CayambeActionMappings;
import org.cayambe.client.ProductDelegate;
import java.util.*;
import org.apache.log4j.Category;

public final class ListProductsAction extends Action {

    private static String CLASSNAME = ListProductsAction.class.getName();
    private Category cat = (Category)Category.getInstance(CLASSNAME);


    public ActionForward perform(ActionMapping mapping, ActionForm form, HttpServletRequest request,
        HttpServletResponse response)
        throws IOException, ServletException {

	    String worked = CayambeActionMappings.SUCCESS;

        ProductVO p = new ProductVO();
	    p.setTitle("%");
	    p.setDesc("%");
	    p.setSKU("%");

		ProductDelegate pd = new ProductDelegate();

	    try {
	      pd.SearchProduct(p);
	    } catch (Exception e){
	      cat.info(e.getMessage());
	    }

        request.setAttribute("products",pd.getProductList());

        return (mapping.findForward(worked));

    }

}